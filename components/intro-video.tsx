import { MacWindow } from "./custom/mac-window";
import { useTranslations } from "next-intl";
import { TextAnimate } from "./magicui/text-animate";
import { VIDEO_TUTORIAL_URL } from "@/constants";
import { getContainerMargins } from "@/lib/utils";

export default function IntroVideoPage() {
  const t = useTranslations('introVideo');
  
  // Create a clean YouTube URL with autoplay, loop, and no suggestions
  const createCleanVideoUrl = (baseUrl: string) => {
    const url = new URL(baseUrl);
    url.searchParams.set('rel', '0');           // No related videos
    url.searchParams.set('showinfo', '0');      // No video info
    url.searchParams.set('controls', '1');      // Show video controls
    url.searchParams.set('modestbranding', '1'); // Minimal YouTube branding
    url.searchParams.set('loop', '1');          // Loop video
    url.searchParams.set('playlist', 'rEkeRl3WkFk'); // Required for loop to work
    url.searchParams.set('autoplay', '0');      // Start paused (user clicks to play)
    url.searchParams.set('mute', '0');          // Audio enabled
    url.searchParams.set('fs', '1');            // Allow fullscreen
    return url.toString();
  };

  const cleanVideoUrl = createCleanVideoUrl(VIDEO_TUTORIAL_URL);

  return (
    <section id="tutorial" className="py-16 md:py-20 bg-white dark:bg-[#0A0A0A] transition-colors duration-300 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0066FF]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className={`${getContainerMargins()} relative z-10`}>
        {/* Header */}
        <div className="text-center mb-12">
          <TextAnimate className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white" animation="blurInUp" by="character" once startOnView>
            {t('titleLine1')}
          </TextAnimate>
        </div>

        {/* YouTube Embed */}
        <MacWindow
          keepAspectRatio
          hoverZoom={false}
          title={t('windowTitle')}
          className="max-w-4xl mx-auto border border-slate-200 dark:border-slate-800 shadow-xl"
        >
          <div className="aspect-w-16 aspect-h-10 h-full">
            <iframe
              className="w-full h-full rounded"
              src={cleanVideoUrl}
              title={t('windowTitle')}
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay"
              allowFullScreen
            />
          </div>
        </MacWindow>
      </div>
    </section>
  );
}
