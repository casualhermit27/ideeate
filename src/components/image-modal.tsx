import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, MessageSquare, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitHubIcon } from '@/components/icons/github-icon';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  landing: {
    id: number;
    title: string;
    image: string;
    category: string;
    platform: string;
    prompt: string;
    repository?: string; // Repository URL instead of code
    rating: number;
    views: string;
  } | null;
}

export default function ImageModal({ isOpen, onClose, landing }: ImageModalProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"prompt" | "github">("prompt");
  const [imageHeight, setImageHeight] = useState<number | null>(null);
  const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);
  const imageRef = useRef<HTMLImageElement>(null);

  // Reset image height when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setImageHeight(null);
    }
  }, [isOpen]);

  // Handle window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle image load
  const handleImageLoad = () => {
    if (imageRef.current) {
      const height = imageRef.current.clientHeight;
      setImageHeight(height);
    }
  };

  // Calculate max available height (85vh minus header height)
  const maxAvailableHeight = windowHeight * 0.85 - 73; // 73px is header height

  if (!isOpen || !landing) return null;

  const copyToClipboard = async (content: string, id: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const openRepository = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Lovable': return 'bg-purple-500/20 text-purple-400';
      case 'Webflow': return 'bg-blue-500/20 text-blue-400';
      case 'Framer': return 'bg-pink-500/20 text-pink-400';
      case 'V0': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-[90vw] max-w-6xl h-[85vh] bg-background rounded-lg flex flex-col overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">{landing.title}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPlatformColor(landing.platform)}`}>
                {landing.platform}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>⭐ {landing.rating}</span>
                <span>{landing.views} views</span>
                <span className="px-2 py-1 bg-muted rounded-full">{landing.category}</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Container */}
          <div className="flex flex-1 overflow-hidden">
            {/* Image Section - Left */}
            <div className="w-2/3 border-r border-border">
              <div 
                className="h-full overflow-y-auto p-4"
                style={imageHeight && imageHeight < maxAvailableHeight ? 
                  { height: `${imageHeight + 32}px` } : 
                  { maxHeight: `${maxAvailableHeight}px` }
                }
              >
                <div className="relative w-full bg-muted rounded-lg overflow-hidden">
                  <img
                    ref={imageRef}
                    src={landing.image}
                    alt={landing.title}
                    className="w-full h-auto object-contain"
                    onLoad={handleImageLoad}
                  />
                </div>
              </div>
            </div>

            {/* Details Section - Right */}
            <div className="w-1/3">
              <div className="h-full overflow-y-auto">
                <div className="p-6 flex flex-col">
                  {/* Tabs and Content Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Tabs 
                        defaultValue="prompt" 
                        className="w-full" 
                        onValueChange={(value: string) => setActiveTab(value as "prompt" | "github")}
                      >
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="prompt" className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Prompt
                          </TabsTrigger>
                          <TabsTrigger value="github" className="flex items-center gap-2">
                            <GitHubIcon className="w-4 h-4" />
                            GitHub
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>

                    {/* Editor-like content area */}
                    <div className="relative group">
                      <div className="bg-muted font-mono text-sm rounded-lg">
                        <div className="flex items-center justify-between px-4 py-2 border-b border-border/50">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {activeTab === "prompt" ? "prompt.txt" : "repository.md"}
                          </span>
                        </div>
                        <div className="relative">
                          {activeTab === "prompt" ? (
                            <pre className="p-4 overflow-x-auto whitespace-pre-wrap break-words min-h-[200px]">
                              <code className="text-sm">
                                {landing.prompt}
                              </code>
                            </pre>
                          ) : (
                            <div className="p-4 min-h-[200px] space-y-4">
                              <div className="flex items-center gap-2 mb-4">
                                <GitHubIcon className="w-5 h-5" />
                                <span className="font-semibold text-foreground">Repository</span>
                              </div>
                              
                              {landing.repository ? (
                                <div className="space-y-4">
                                  <div className="bg-background/50 border border-border rounded-lg p-3">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <GitHubIcon className="w-4 h-4" />
                                        <span className="text-sm font-medium">Source Code</span>
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => openRepository(landing.repository!)}
                                        className="text-blue-500 hover:text-blue-600"
                                      >
                                        <ExternalLink className="w-4 h-4 mr-1" />
                                        Open
                                      </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2 font-mono break-all">
                                      {landing.repository}
                                    </p>
                                  </div>
                                  
                                  <div className="text-xs text-muted-foreground space-y-2">
                                    <div className="flex items-center gap-2">
                                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                      <span>Ready to deploy</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                      <span>Modern tech stack</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                      <span>Responsive design</span>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center text-muted-foreground py-8">
                                  <GitHubIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                  <p>Repository not available</p>
                                  <p className="text-xs">Check back later for source code</p>
                                </div>
                              )}
                            </div>
                          )}
                          
                          {activeTab === "prompt" && (
                            <div className="absolute bottom-2 right-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(landing.prompt, landing.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 hover:bg-background/80 backdrop-blur-sm"
                              >
                                {copiedId === landing.id ? (
                                  <div className="flex items-center gap-1">
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span className="text-xs text-green-500">Copied!</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1">
                                    <Copy className="w-4 h-4" />
                                    <span className="text-xs">Copy</span>
                                  </div>
                                )}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Platform Info */}
                  <div className="space-y-3 flex-1 mt-6">
                    <h4 className="font-medium">About {landing.platform}</h4>
                    <div className="text-sm text-muted-foreground">
                      {landing.platform === 'Lovable' && (
                        <p>Lovable is an AI-powered web development platform that builds full-stack applications from prompts.</p>
                      )}
                      {landing.platform === 'Webflow' && (
                        <p>Webflow is a visual web development platform for designing, building, and launching responsive websites.</p>
                      )}
                      {landing.platform === 'Framer' && (
                        <p>Framer is a powerful design tool for creating interactive prototypes and production-ready websites.</p>
                      )}
                      {landing.platform === 'V0' && (
                        <p>V0 is Vercel's generative user interface system powered by AI for rapid UI development.</p>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-border mt-4">
                    <div className="flex gap-3">
                      <Button className="flex-1">
                        Use This Design
                      </Button>
                      <Button variant="outline" className="flex-1">
                        View Live Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 