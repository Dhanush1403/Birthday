import { Button } from "@/components/ui/button";
import { Share2, Download, Facebook, Twitter, Heart } from "lucide-react";
import { toast } from "sonner";

const ShareButtons = () => {
  const handleDownload = () => {
    toast.success("Screenshot feature coming soon! 📸");
  };

  const handleShare = async () => {
    const shareData = {
      title: "Birthday Surprise! 🎉",
      text: "Check out this amazing birthday surprise I created!",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Shared successfully! 🎊");
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard! 📋");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleSocialShare = (platform: "facebook" | "twitter") => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("Check out this amazing birthday surprise! 🎉");
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Button
        size="sm"
        onClick={handleShare}
        className="gap-2 rounded-full"
        style={{ background: "var(--gradient-button)" }}
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>
      
      <Button
        size="sm"
        onClick={handleDownload}
        className="gap-2 rounded-full"
        style={{ background: "var(--gradient-button)" }}
      >
        <Download className="w-4 h-4" />
        Save
      </Button>

      <div className="flex gap-2">
        <Button
          size="icon"
          onClick={() => handleSocialShare("facebook")}
          className="rounded-full w-9 h-9"
          style={{ background: "#1877F2" }}
        >
          <Facebook className="w-4 h-4" />
        </Button>
        
        <Button
          size="icon"
          onClick={() => handleSocialShare("twitter")}
          className="rounded-full w-9 h-9"
          style={{ background: "#1DA1F2" }}
        >
          <Twitter className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default ShareButtons;
