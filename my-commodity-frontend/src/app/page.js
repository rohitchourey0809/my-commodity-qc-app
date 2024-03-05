import ImageCapture from "@/components/ImageCapture";
import CropSelection from "@/components/CropSelection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h2>SQL PROJECT</h2>
      <div>
        <CropSelection />
      </div>
      <div>
        <ImageCapture />
      </div>
    </main>
  );
}
