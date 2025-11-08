import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import BirthdayBanner from "@/components/BirthdayBanner";
import Confetti from "@/components/Confetti";
import Candle3D from "@/components/Candle3D";
import EnhancedParticles from "@/components/EnhancedParticles";
import PhotoUpload from "@/components/PhotoUpload";
import ShareButtons from "@/components/ShareButtons";
import WishInput from "@/components/WishInput";
import { Gift, Flame, Mail, ArrowRight, RotateCcw, Volume2, VolumeX, Camera, Sparkles } from "lucide-react";
import characterBox from "@/assets/character-box.png";
import characterCute from "@/assets/character-cute.png";
import BirthdayScene from "@/components/BirthdayScene";
import { useSound } from "@/hooks/useSound";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from "sonner";

const Index = () => {
  const [stage, setStage] = useState(-2); // Start with name input
  const [recipientName, setRecipientName] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [candleLit, setCandleLit] = useState(false);
  const [balloons, setBalloons] = useState([true, true, true, true]);
  const [poppedWords, setPoppedWords] = useState<string[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [zoomedCard, setZoomedCard] = useState<number | null>(null);
  const [photos, setPhotos] = useState<{ url: string; title: string; subtitle: string }[]>([
    { url: "/image/WhatsApp Image 2025-11-08 at 5.50.30 PM.jpeg", title: "Sweet Memory 1", subtitle: "Our special moment" },
    { url: "/image/WhatsApp Image 2025-11-08 at 5.50.30 PM (1).jpeg", title: "Sweet Memory 2", subtitle: "Another beautiful day" },
    { url: "/image/WhatsApp Image 2025-11-08 at 5.50.30 PM (2).jpeg", title: "Sweet Memory 3", subtitle: "Unforgettable times" },
  ]);
  const [birthdayWish, setBirthdayWish] = useState("");
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  
  const { playBalloonPop, playCandleLight, playSuccess, playClick } = useSound();
  const { playMusic, stopMusic, isPlaying } = useBackgroundMusic();

  // Countdown effect
  useEffect(() => {
    if (stage === -1) {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setStage(0);
          playMusic();
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [stage, countdown, playMusic]);

  const handleBalloonPop = (index: number) => {
    const newBalloons = [...balloons];
    newBalloons[index] = false;
    setBalloons(newBalloons);
    
    playBalloonPop();
    
    const words = ["You", "are", "the", "best"];
    setPoppedWords([...poppedWords, words[index]]);
    
    if (newBalloons.every(b => !b)) {
      setTimeout(() => {
        playSuccess();
        setStage(3);
      }, 1000);
    }
  };

  const balloonColors = [
    "linear-gradient(135deg, #FF6B9D, #FF8FB9)",
    "linear-gradient(135deg, #FFD700, #FFED4E)",
    "linear-gradient(135deg, #00FF9F, #00FFCC)",
    "linear-gradient(135deg, #00D9FF, #00E5FF)"
  ];

  const balloonWords = ["You", "are", "the", "best"];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BirthdayBanner />
      <EnhancedParticles />
      <ShareButtons />
      
      {/* Music Control */}
      <button
        onClick={() => isPlaying ? stopMusic() : playMusic()}
        className="fixed top-4 right-4 z-50 p-3 rounded-full transition-all hover:scale-110"
        style={{ background: "var(--gradient-button)" }}
        aria-label="Toggle music"
      >
        {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-2 sm:p-4 pt-16 sm:pt-24">
        {/* Stage -2: Name Input */}
        {stage === -2 && (
          <div className="text-center animate-fade-in max-w-md w-full">
            <div className="text-7xl mb-6 animate-[float_3s_ease-in-out_infinite]">🎂</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ 
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Type your name birthday girl 🤩
            </h1>
            <Card className="p-4 sm:p-6 mb-4" style={{ background: "var(--gradient-primary)" }}>
              <Input
                type="text"
                placeholder="Enter their name..."
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="mb-4 text-center text-lg"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && recipientName.trim()) {
                    playClick();
                    setStage(-1);
                  }
                }}
              />
              <Button
                size="lg"
                className="w-full text-lg px-8 py-6 rounded-full font-bold"
                style={{ background: "var(--gradient-button)" }}
                onClick={() => {
                  if (recipientName.trim()) {
                    playClick();
                    setStage(-1);
                  } else {
                    toast.error("Please enter a name! 😊");
                  }
                }}
              >
                <Sparkles className="mr-2" />
                Begin the Magic
              </Button>
            </Card>
          </div>
        )}
        {/* Stage -1: Countdown */}
        {stage === -1 && (
          <div className="text-center animate-fade-in">
            <h1 className="text-9xl md:text-[12rem] font-bold animate-pulse" style={{ 
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              {countdown > 0 ? countdown : "🎉"}
            </h1>
          </div>
        )}

        {/* Stage 0: Welcome */}
        {stage === 0 && (
          <div className="text-center animate-fade-in">
            <img src={characterCute} alt="Cute character" className="w-32 h-32 mx-auto mb-6 animate-[float_3s_ease-in-out_infinite]" />
            <h1 className="text-5xl md:text-6xl font-bold mb-4 italic" style={{ 
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              {recipientName}, cute little piggy ⭐
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Yes, it's YOU! A magical surprise awaits...
            </p>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 rounded-full font-bold"
              style={{ background: "var(--gradient-button)" }}
              onClick={() => {
                playClick();
                setStage(1);
              }}
            >
              <Gift className="mr-2" />
              Start the surprise
            </Button>
          </div>
        )}

        {/* Stage 1: Light the Candle */}
        {stage === 1 && (
          <div className="text-center animate-fade-in">
            {candleLit && <Confetti />}
            
            <BirthdayScene />
            
            {!candleLit ? (
              <Button 
                size="lg" 
                className="mt-8 text-lg px-6 py-4 rounded-full font-bold animate-pulse"
                style={{ background: "var(--gradient-button)" }}
                onClick={() => {
                  setCandleLit(true);
                  playCandleLight();
                  toast.success("✨ Make a wish! ✨");
                }}
              >
                <Flame className="mr-2" />
                Light the Candle
              </Button>
            ) : (
              <div className="mt-8 animate-fade-in">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ 
                  background: "var(--gradient-text)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}>
                  Happy Birthday, {recipientName}! 🎂
                </h2>
                <Button 
                  size="lg" 
                  className="text-lg px-8 py-6 rounded-full font-bold"
                  style={{ background: "var(--gradient-button)" }}
                  onClick={() => {
                    playClick();
                    setStage(2);
                  }}
                >
                  Pop the Balloons
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Stage 2: Pop Balloons */}
        {stage === 2 && (
          <Card className="p-4 sm:p-6 md:p-8 max-w-3xl w-full animate-fade-in" style={{ background: "var(--gradient-primary)" }}>
            <p className="text-center text-lg mb-4 text-muted-foreground">Pop all 4 balloons</p>
            
            {/* Display popped words */}
            <div className="text-center mb-4 min-h-[3rem]">
              <h2 className="text-xl sm:text-2xl md:text-4xl font-bold" style={{ 
                background: "var(--gradient-text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                {poppedWords.join(" ")}
              </h2>
            </div>

            <div className="flex justify-center items-end gap-2 sm:gap-4 md:gap-8 mb-4">
              {balloons.map((active, index) => (
                active ? (
                  <div
                    key={index}
                    className="relative cursor-pointer transition-transform hover:scale-110 animate-[float_3s_ease-in-out_infinite]"
                    style={{ animationDelay: `${index * 0.2}s` }}
                    onClick={() => handleBalloonPop(index)}
                  >
                    <div 
                      className="w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28 rounded-full relative flex items-center justify-center"
                      style={{ background: balloonColors[index] }}
                    >
                      <div className="absolute top-2 left-4 w-8 h-10 bg-white/30 rounded-full" />
                    </div>
                    <div className="w-0.5 h-16 sm:h-20 md:h-24 bg-gray-400 mx-auto" />
                  </div>
                ) : (
                  <div key={index} className="w-20 h-28 flex items-center justify-center">
                    <span className="text-4xl animate-fade-in">{index % 2 === 0 ? '❤️' : '✨'}</span>
                  </div>
                )
              ))}
            </div>
          </Card>
        )}

        {/* Stage 3: You are the best */}
        {stage === 3 && (
          <>
            <Confetti />
            <div className="text-center animate-fade-in">
              <h2 className="text-6xl md:text-7xl font-bold mb-8 italic" style={{ 
                background: "var(--gradient-text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                You are the best! 🎉
              </h2>
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full font-bold"
                style={{ background: "var(--gradient-button)" }}
                onClick={() => {
                  playClick();
                  setStage(4);
                }}
              >
                Next
                <ArrowRight className="ml-2" />
              </Button>
            </div>
          </>
        )}

        {/* Stage 4: Photo Cards */}
        {stage === 4 && (
          <div className="text-center animate-fade-in max-w-3xl w-full px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 italic" style={{ 
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Our Sweet Memories 📸
            </h2>
            <p className="text-muted-foreground mb-4 italic">(Swipe to see the moments)</p>
            
            {!showPhotoUpload ? (
              <Button
                onClick={() => setShowPhotoUpload(true)}
                className="mb-6 gap-2"
                style={{ background: "var(--gradient-button)" }}
              >
                <Camera className="w-4 h-4" />
                Add Your Photos
              </Button>
            ) : (
              <div className="mb-6">
                <PhotoUpload
                  onPhotosUploaded={setPhotos}
                  existingPhotos={photos}
                />
              </div>
            )}
            
            <Carousel className="w-full max-w-2xl mx-auto mb-8">
              <CarouselContent>
                {photos.map((photo, index) => (
                  <CarouselItem key={index}>
                    <Card 
                      className={`p-4 md:p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-500 overflow-hidden ${
                        zoomedCard === index ? 'scale-105' : 'scale-100'
                      }`}
                      style={{
                        background: "linear-gradient(135deg, hsl(330, 70%, 40%), hsl(280, 70%, 50%))",
                        minHeight: "600px"
                      }}
                      onClick={() => {
                        playClick();
                        setZoomedCard(index);
                        setTimeout(() => setZoomedCard(null), 600);
                      }}
                    >
                      {photo.url ? (
                        <img
                          src={photo.url}
                          alt={photo.title}
                          className="w-full h-[400px] object-cover object-center rounded-lg mb-4"
                        />
                      ) : (
                        <div className="text-8xl mb-4 animate-[float_3s_ease-in-out_infinite]">📷</div>
                      )}
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{photo.title}</h3>
                      <p className="text-white/80 text-lg">{photo.subtitle}</p>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full font-bold"
                style={{ background: "var(--gradient-button)" }}
                onClick={() => {
                  playClick();
                  setStage(4.5);
                }}
              >
                <Sparkles className="mr-2" />
                Make a Wish
              </Button>
            </div>
          </div>
        )}

        {/* Stage 4.5: Wish Input */}
        {stage === 4.5 && (
          <div className="text-center animate-fade-in">
            <WishInput
              onWishSubmit={(wish) => {
                setBirthdayWish(wish);
                playSuccess();
                toast.success("Your wish has been captured! 🌟");
                setTimeout(() => setStage(5), 1000);
              }}
            />
          </div>
        )}

        {/* Stage 5: Gift Box */}
        {stage === 5 && (
          <div className="text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-12 italic" style={{ 
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              One Last Thing...
            </h2>
            <div 
              className="relative inline-block cursor-pointer transition-transform hover:scale-110 animate-[float_3s_ease-in-out_infinite]"
              onClick={() => {
                playClick();
                setStage(6);
              }}
            >
              <div className="text-9xl mb-4">🎁</div>
              <p className="text-xl text-muted-foreground italic">Tap the gift</p>
            </div>
          </div>
        )}

        {/* Stage 6: Greeting Card Closed */}
        {stage === 6 && (
          <div className="text-center animate-fade-in max-w-md w-full px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic" style={{ 
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              A Special Message
            </h2>
            <Card 
              className="relative p-8 cursor-pointer transition-transform hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #E91E63, #9C27B0)",
                border: "8px solid rgba(255, 255, 255, 0.3)"
              }}
              onClick={() => {
                playClick();
                playSuccess();
                setStage(7);
              }}
            >
              <div className="space-y-6">
                <div className="flex justify-center gap-4 mb-4">
                  <div className="text-6xl animate-[float_3s_ease-in-out_infinite]">🎈</div>
                  <div className="text-6xl animate-[float_3s_ease-in-out_infinite]" style={{ animationDelay: "0.3s" }}>🎈</div>
                  <div className="text-6xl animate-[float_3s_ease-in-out_infinite]" style={{ animationDelay: "0.6s" }}>🎈</div>
                </div>
                <div className="text-5xl mb-4">🎀</div>
                <h3 className="text-3xl md:text-4xl font-bold text-white italic mb-2">Happy Birthday</h3>
                <p className="text-xl text-white/90 italic mb-6">to you</p>
                <Button 
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold"
                  onClick={(e) => {
                    e.stopPropagation();
                    playClick();
                    playSuccess();
                    setStage(7);
                  }}
                >
                  Tap to Open
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Stage 7: Greeting Card Opened */}
        {stage === 7 && (
          <div className="text-center animate-fade-in max-w-3xl w-full px-4">
            <Confetti />
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic" style={{ 
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              A Special Message
            </h2>
            <div className="relative">
              <Card 
                className="p-8 md:p-12"
                style={{
                  background: "linear-gradient(135deg, #FFB6C1, #FFC0CB)",
                  border: "8px solid rgba(147, 51, 234, 0.3)"
                }}
              >
                <div className="text-left space-y-4 italic text-base md:text-lg" style={{ color: "#4A0E4E" }}>
                  <p>
                    Always, You have this special way of making everything around you brighter, your smile, your kindness, and the way you make people feel truly cared for. I hope your day is filled with laughter, surprises, and moments (coz im with u 😌😂❤️)that make your heart happy.
                  </p>
                  <p>
                    You're truly one of a kind, and I just want you to know how special you are. Keep being the amazing person you are, spreading joy wherever you go, wishing you endless happiness, success, and all the sweet things life has to offer.
                  </p>
                  <div className="flex justify-center gap-3 mt-8 text-4xl">
                    <span className="animate-[float_3s_ease-in-out_infinite]">🎈</span>
                    <span className="animate-[float_3s_ease-in-out_infinite]" style={{ animationDelay: "0.3s" }}>🎈</span>
                    <span className="animate-[float_3s_ease-in-out_infinite]" style={{ animationDelay: "0.6s" }}>🎈</span>
                  </div>
                </div>
              </Card>
            </div>
            <Button 
              size="lg" 
              className="mt-8 text-lg px-8 py-6 rounded-full font-bold"
              style={{ background: "var(--gradient-button)" }}
              onClick={() => {
                playClick();
                setStage(8);
              }}
            >
              Next
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        )}

        {/* Stage 8: Final Message */}
        {stage === 8 && (
          <Card className="p-8 md:p-12 max-w-2xl w-full text-center animate-fade-in" style={{ background: "var(--gradient-primary)" }}>
            <img src={characterBox} alt="Character in box" className="w-32 h-32 mx-auto mb-6 animate-[float_3s_ease-in-out_infinite]" />
            <h3 className="text-2xl font-bold mb-4" style={{ 
              background: "var(--gradient-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Lots of love for you ❤️
            </h3>
            <p className="text-lg mb-8 text-foreground">
              Once again, Happy Birthday! Hope you loved your surprise.
            </p>
            <div className="space-y-4">
              {birthdayWish && (
                <Card className="p-4 bg-background/50 backdrop-blur-sm">
                  <p className="text-sm text-muted-foreground italic mb-1">Your Birthday Wish:</p>
                  <p className="text-foreground italic">"{birthdayWish}"</p>
                </Card>
              )}
              
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 rounded-full font-bold w-full"
                style={{ background: "var(--gradient-button)" }}
                onClick={() => {
                  playClick();
                  setStage(-2);
                  setRecipientName("");
                  setCountdown(3);
                  setCandleLit(false);
                  setBalloons([true, true, true, true]);
                  setPoppedWords([]);
                  setCurrentCard(0);
                  setZoomedCard(null);
                  setBirthdayWish("");
                  setShowPhotoUpload(false);
                  toast.success("Let's celebrate again! 🎉");
                }}
              >
                <RotateCcw className="mr-2" />
                Create Another Surprise
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
