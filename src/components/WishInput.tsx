import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

interface WishInputProps {
  onWishSubmit: (wish: string) => void;
}

const WishInput = ({ onWishSubmit }: WishInputProps) => {
  const [wish, setWish] = useState("");

  const handleSubmit = () => {
    if (wish.trim()) {
      onWishSubmit(wish);
    }
  };

  return (
    <Card className="p-6 max-w-md w-full" style={{ background: "var(--gradient-primary)" }}>
      <h3 className="text-2xl font-bold mb-4 text-center" style={{ 
        background: "var(--gradient-text)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}>
        Make a Birthday Wish! ✨
      </h3>
      
      <Textarea
        placeholder="Write your heartfelt wish here..."
        value={wish}
        onChange={(e) => setWish(e.target.value)}
        className="mb-4 min-h-[120px] resize-none"
      />
      
      <Button
        onClick={handleSubmit}
        className="w-full gap-2"
        style={{ background: "var(--gradient-button)" }}
        disabled={!wish.trim()}
      >
        <Sparkles className="w-4 h-4" />
        Send Wish
      </Button>
    </Card>
  );
};

export default WishInput;
