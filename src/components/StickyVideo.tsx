import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Minimize2, Maximize2 } from 'lucide-react';

interface StickyVideoProps {
  videoId: string;
  championName: string;
}

export function StickyVideo({ videoId, championName }: StickyVideoProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (videoRef.current) {
//         const rect = videoRef.current.getBoundingClientRect();
//         const isOutOfView = rect.bottom < 0;
//         setIsSticky(isOutOfView);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const videoSrc = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`;

  return (
    <>
      {/* Container de référence pour la vidéo */}
      <div ref={videoRef} className="max-w-2xl mx-auto mb-12">
        <Card className="bg-lol-blue-dark/80 border-lol-gold/30">
          <CardHeader>
            <CardTitle className="text-lol-gold flex items-center gap-2">
              <Play className="w-5 h-5" />
              Guide Vidéo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg overflow-hidden relative">
              <iframe
                ref={iframeRef}
                width="100%"
                height="100%"
                src={videoSrc}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`Guide ${championName}`}
                className={`
                  transition-all duration-300 ease-in-out rounded-lg
                  ${isSticky 
                    ? 'fixed bottom-4 right-4 z-50 max-w-[calc(100vw-2rem)]' 
                    : 'w-full h-full relative'
                  }
                `}
                style={isSticky ? {
                  width: isMinimized ? '256px' : '320px',
                  height: isMinimized ? '5px' : '180px',
                  aspectRatio: isMinimized ? 'auto' : '16/9'
                } : {}}
              />
              
              {/* Overlay avec contrôles uniquement en mode sticky - AU DESSUS de la vidéo */}
              {isSticky && (
                <div className="fixed z-[51] pointer-events-none max-w-[calc(100vw-2rem)]"
                  style={{
                    bottom: isMinimized ? '16px' : 'calc(16px + 180px)', // Au dessus de l'iframe
                    right: '16px',
                    width: isMinimized ? '256px' : '320px'
                  }}>
                  <div className="bg-lol-blue-dark/95 border border-lol-gold/50 rounded-lg p-2 pointer-events-auto backdrop-blur-sm">
                    <div className="flex items-center justify-between text-xs md:text-sm">
                      <div className="flex items-center gap-2 min-w-0 flex-1 text-lol-gold">
                        <Play className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                        <span className="truncate">Guide {championName}</span>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={toggleMinimize}
                          className="p-1 rounded hover:bg-lol-gold/20 transition-colors text-lol-gold"
                          title={isMinimized ? "Agrandir" : "Réduire"}
                        >
                          {isMinimized ? (
                            <Maximize2 className="w-3 h-3 md:w-4 md:h-4" />
                          ) : (
                            <Minimize2 className="w-3 h-3 md:w-4 md:h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}