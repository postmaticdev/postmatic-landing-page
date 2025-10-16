import { VIDEO_INTRODUCTION_URL } from "@/constants";
import { MacWindow } from "./custom/mac-window";

import { getContainerMargins } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function Introduction() {
  const t = useTranslations('introduction');

  // Create a clean YouTube URL with autoplay, loop, and no suggestions
  const createCleanVideoUrl = (baseUrl: string) => {
    const url = new URL(baseUrl);
    url.searchParams.set('rel', '0');           // No related videos
    url.searchParams.set('showinfo', '0');      // No video info
    url.searchParams.set('controls', '1');      // Show video controls
    url.searchParams.set('modestbranding', '1'); // Minimal YouTube branding
    url.searchParams.set('loop', '1');          // Loop video
    url.searchParams.set('playlist', 'LRGvK7NwriE'); // Required for loop to work
    url.searchParams.set('autoplay', '0');      // Start paused (user clicks to play)
    url.searchParams.set('mute', '0');          // Audio enabled
    url.searchParams.set('fs', '1');            // Allow fullscreen
    return url.toString();
  };

  const cleanVideoUrl = createCleanVideoUrl(VIDEO_INTRODUCTION_URL);
  
  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center bg-gradient-to-b from-white via-blue-50 to-indigo-50 dark:from-black dark:via-slate-950 dark:to-slate-900 overflow-hidden"
    >
      <div className={cn("relative pt-20 pb-32", getContainerMargins())}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 md:gap-14 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900 dark:text-slate-100 tracking-tight">
                {t('headline')}{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent drop-shadow-sm">
                  {t('brand')}
                </span>
                ?
              </h1>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-400">
                {t('subHeadline')}
              </p>
            </div>

            {/* Hero Video/Dashboard Preview */}
            <div className="relative">
              <MacWindow keepAspectRatio hoverZoom={false} title="What is Postmatic?">
               
              <iframe
              className="w-full h-full rounded"
              src={cleanVideoUrl}
              title="Overview Postmatic"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
              allowFullScreen
            />
             
              </MacWindow>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
