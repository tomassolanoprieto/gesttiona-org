import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBlogPosts, getProperties } from '../lib/cms';
import type { BlogPost } from '../types/blog';
import type { Property } from '../types/property';

interface ContentState {
  blogPosts: BlogPost[];
  properties: Property[];
  loading: boolean;
  error: string | null;
}

interface ContentContextType extends ContentState {
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ContentState>({
    blogPosts: [],
    properties: [],
    loading: true,
    error: null,
  });

  const refreshContent = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const [blogPosts, properties] = await Promise.all([
        getBlogPosts(),
        getProperties(),
      ]);
      setState({
        blogPosts,
        properties,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error loading content',
      }));
    }
  };

  useEffect(() => {
    refreshContent();
  }, []);

  return (
    <ContentContext.Provider value={{ ...state, refreshContent }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}