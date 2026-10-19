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
      className="relative py-16 md:py-20 flex items-center bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-[#0A0A0A] dark:via-[#080d1a] dark:to-[#0A0A0A] overflow-hidden transition-colors duration-300"
    >
      <div className={cn("relative z-10 w-full", getContainerMargins())}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 md:gap-14 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-slate-900 dark:text-white tracking-tight">
                {t('headline')}{" "}
                <span className="bg-gradient-to-r from-[#0066FF] via-indigo-600 to-[#3385ff] dark:from-[#3385ff] dark:via-indigo-300 dark:to-[#66a3ff] bg-clip-text text-transparent">
                  {t('brand')}
                </span>
                ?
              </h2>

              <p className="text-base sm:text-lg leading-relaxed text-slate-600 dark:text-zinc-400">
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
