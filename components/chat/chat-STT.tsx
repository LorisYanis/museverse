import { Mic, StopCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { WhisperSTT } from "whisper-speech-to-text";
import { toast } from "sonner";
import Image from "next/image";

interface ChatSTTProps {
  setInput: Dispatch<SetStateAction<string>>;
}

export const ChatSTT = ({ setInput }: ChatSTTProps) => {
  const whisper = useMemo(
    () => new WhisperSTT(process.env.OPENAI_API_KEY || ""),
    [],
  );
  const [isRecording, setIsRecording] = useState(false);
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    if (isRecording)
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const audioContext = new AudioContext();
          const source = audioContext.createMediaStreamSource(stream);
          const analyser = audioContext.createAnalyser();
          source.connect(analyser);
          analyser.fftSize = 256;

          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const updateOpacity = () => {
            analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a, b) => a + b) / bufferLength;
            setOpacity(average / 255);

            requestAnimationFrame(updateOpacity);
          };

          updateOpacity();
        })
        .catch((err) =>
          console.error("Microphone access denied or not available:", err),
        );
  }, [isRecording]);

  const startRecordingHandler = async () => {
    try {
      setIsRecording(true);
      await whisper.startRecording();
    } catch (error) {
      toast.error("An issue with speech recognition has occurred");
      setIsRecording(false);
    }
  };
  const stopRecordingHandler = async () => {
    try {
      setIsRecording(false);
      await whisper.stopRecording((text) => {
        setInput(text);
      });
    } catch (error) {
      toast.error("Problem with getting the result");
      console.log(error);
    }
  };

  return (
    <>
      {isRecording ? (
        <Button
          type="button"
          variant="outlineOpacity"
          size="icon"
          className="group transition"
          onClick={stopRecordingHandler}
        >
          <StopCircle className="h-5 w-5 transition text-muted-foreground group-hover:text-foreground" />
        </Button>
      ) : (
        <Button
          type="button"
          variant="outlineOpacity"
          size="icon"
          className="group transition"
          onClick={startRecordingHandler}
        >
          <Mic className="h-5 w-5 transition text-muted-foreground group-hover:text-foreground" />
        </Button>
      )}

      {isRecording && (
        <div className="-z-50" style={{ opacity: opacity }}>
          <div className="fixed h-[100rem] w-[100rem] right-1/2 translate-x-1/2 bottom-0 translate-y-1/2 -z-50">
            <Image src="/main-gradient.png" fill alt="" quality={100} />
          </div>
        </div>
      )}
    </>
  );
};
