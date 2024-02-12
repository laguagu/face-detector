"use client";
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Camera, PersonStanding, Video } from "lucide-react";
import { toast } from "sonner";
import { Rings } from "react-loader-spinner";
import * as cocossd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import { DetectedObject, ObjectDetection } from "@tensorflow-models/coco-ssd";
import {drawOnCanvas} from "@/lib/draw";

let interval: any = null;

export default function HomePage() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // states
  const [mirrored, setMirrored] = useState<boolean>(false);
  const [autoRecordEnabled, setAutoRecordEnabled] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [model, setModel] = useState<ObjectDetection>();
  const [loading, setLoading] = useState(false);

  // This can be done better way to using next js slots and suspense loading
  useEffect(() => {
    setLoading(true);
    initModel();
  }, []);

  // loads model
  // set it in a state variable
  async function initModel() {
    const loadedModel: ObjectDetection = await cocossd.load({
      base: "mobilenet_v2",
    });
    setModel(loadedModel);
  }

  useEffect(() => {
    if (model) {
      setLoading(false);
    }
  }, [model]);

  async function runPrediction() {
    if (
      model &&
      webcamRef.current &&
      webcamRef.current.video &&
      webcamRef.current.video.readyState === 4
    ) {
      const predictions: DetectedObject[] = await model.detect(
        webcamRef.current.video
      );


      resizeCanvas(canvasRef, webcamRef);
      drawOnCanvas(mirrored,predictions, canvasRef.current?.getContext("2d"));
    }
  }

  useEffect(() => {
    interval = setInterval(() => {
      runPrediction();
    }, 100);

    return () => clearInterval(interval);
  }, [webcamRef.current, model]);

  return (
    <div className="flex h-screen">
      {/* Left section - webcam and canvas */}
      <div className="relative">
        <div className="relative h-screen w-full">
          <Webcam
            className="w-full h-full p-2 object-contain"
            ref={webcamRef}
          />
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
                <Rings color="white" height={40} />
              ) : (
                <PersonStanding />
              )}
            </Button>
            <Separator className="my-2 bg-red-400" />
          </div>

          {/* bottom section */}
          <div className="flex flex-col">
            <Separator className="my-2 bg-red-400" />
          </div>
        </div>
      </div>

      <div className="h-full flex-1 py-4 px-2 overflow-y-scroll">
        <HighLightSection />
      </div>
      {/* This can be done better way to using next js slots and suspense loading */}
      {loading && (
        <div className="z-50 absolute w-full h-full flex items-center justify-center bg-primary-foreground">
          Getting things ready . . . <Rings height={50} color="red" />
        </div>
      )}
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

function HighLightSection() {
  return <div>Higlight</div>;
}
function resizeCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  webcamRef: React.RefObject<Webcam>
) {
  const canvas = canvasRef.current;
  const video = webcamRef.current?.video;

  if (canvas && video) {
    const { videoWidth, videoHeight } = video;
    canvas.width = videoWidth;
    canvas.height = videoHeight;
  }
}
