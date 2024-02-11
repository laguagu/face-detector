"use client";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Camera, PersonStanding, Video } from "lucide-react";
import { toast } from "sonner"

export default function HomePage() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // states
  const [autoRecordEnabled, setAutoRecordEnabled] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false)

  return (
    <div className="flex h-screen">
      {/* Left section - webcam and canvas */}
      <div className="relative">
        <div className="relative h-screen w-full">
          <Webcam className="w-full h-full p-2 object-contain" />
          <canvas
            ref={canvasRef}
            className="absolute h-full w-full object-contain justify-end top-0 left-0"
          ></canvas>
        </div>
      </div>

      <div className="flex flex-row flex-1">
        <div className="border-primary/5 max-w-xs border-2 flex flex-col justify-between p-4 rounded-xl gap-2">
          {/* Top section */}
          <div className="flex flex-col">
            <ModeToggle />
            asd
            <Separator className="my-2 bg-red-400" />
          </div>
          {/* middle section */}
          <div className="flex flex-col gap-2">
            <Separator className="my-2 bg-red-400" />
            <Button variant={"outline"} size={"icon"} onClick={takePicture}>
              <Camera />
            </Button>
            <Button variant={"outline"} size={"icon"} onClick={recordScreen}>
              <Video />
            </Button>
            <Separator className="my-2 bg-red-400" />
            <Button
              variant={autoRecordEnabled ? "destructive" : "outline"}
              size={"icon"}
              onClick={toggleAutoRecord}
            >
              {autoRecordEnabled ? (
                <PersonStanding color="white" height={45} />
              ) : (
                <PersonStanding />
              )}
            </Button>
            <Separator className="my-2 bg-red-400" />
          </div>
          {/* bottom section */}
          <div className="flex flex-col">
            <Separator className="my-2 bg-red-400" />
            asd
          </div>
        </div>
      </div>
    </div>
  );

  function takePicture() {
    // Take picture

    // Save it to downlaods
  }

  function recordScreen() {
    // Take picture

    // Save it to downlaods
  }


  function toggleAutoRecord() {
    if (autoRecordEnabled) {
      setAutoRecordEnabled(false);
      toast("Autorecord disabled");
      // show toast to user to notify the change
    } else {
      setAutoRecordEnabled(true);
      toast("Autorecord enabled");
      // show toast
    }
  }


}
