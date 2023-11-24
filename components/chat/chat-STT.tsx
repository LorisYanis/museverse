"use client";

import { toast } from "sonner";
import { WhisperSTT } from "whisper-speech-to-text";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

import { Mic, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatSTTProps {
  setInput: Dispatch<SetStateAction<string>>;
  setFalseIsRecording: Dispatch<SetStateAction<boolean>>;
  isLoading?: boolean;
}

export const ChatSTT = ({
  setInput,
  setFalseIsRecording,
  isLoading,
}: ChatSTTProps) => {
  const whisper = useMemo(
    () => new WhisperSTT(process.env.OPENAI_API_KEY || ""),
    [],
  );
  const [isRecording, setIsRecording] = useState<boolean>(false);

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
        })
        .catch((err) =>
          console.error("Microphone access denied or not available:", err),
        );
  }, [isRecording]);

  const startRecordingHandler = async () => {
    try {
      setIsRecording(true);
      setFalseIsRecording(true);

      await whisper.startRecording();
    } catch (error) {
      toast.error("An issue with speech recognition has occurred");

      setIsRecording(false);
      setFalseIsRecording(false);
    }
  };
  const stopRecordingHandler = async () => {
    try {
      setIsRecording(false);
      setFalseIsRecording(false);

      await whisper.stopRecording((text: string) => {
        setInput(text);
      });
    } catch (error) {
      toast.error("Problem with getting the result");
      console.log(error);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="transition text-muted-foreground hover:text-foreground disabled:opacity-0"
      onClick={isRecording ? stopRecordingHandler : startRecordingHandler}
      disabled={isLoading}
    >
      {isRecording ? (
        <StopCircle className="h-5 w-5" />
      ) : (
        <Mic className="h-5 w-5" />
      )}
    </Button>
  );
};
