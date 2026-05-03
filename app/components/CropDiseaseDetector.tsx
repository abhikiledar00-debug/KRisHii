import React, {
  useState
} from "react";

export function CropDiseaseDetector() {

  const [
    image,
    setImage
  ] = useState<any>(null);

  const [
    result,
    setResult
  ] = useState("");

  const handleDetect =
    () => {

      // DEMO AI LOGIC
      const diseases = [

        "Healthy Crop ✅",

        "Leaf Spot Disease 🍂",

        "Nitrogen Deficiency 🌱",

        "Fungal Infection 🍄"

      ];

      const random =
        diseases[
          Math.floor(
            Math.random() *
            diseases.length
          )
        ];

      setResult(random);
    };

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 mt-6">

      <h2 className="text-2xl font-bold text-green-700 mb-4">
        AI Crop Disease Detector 🤖
      </h2>

      {/* IMAGE INPUT */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setImage(
            URL.createObjectURL(
              e.target.files?.[0] as File
            )
          )
        }
        className="mb-4"
      />

      {/* PREVIEW */}
      {image && (

        <img
          src={image}
          alt="Crop"
          className="w-full h-64 object-cover rounded-xl mb-4"
        />

      )}

      {/* BUTTON */}
      <button
        onClick={handleDetect}
        className="bg-green-600 text-white px-5 py-3 rounded-xl"
      >
        Detect Disease
      </button>

      {/* RESULT */}
      {result && (

        <div className="mt-5 bg-green-100 p-4 rounded-xl">

          <h3 className="text-xl font-bold text-green-700">
            Result:
          </h3>

          <p className="mt-2 text-lg">
            {result}
          </p>

        </div>

      )}

    </div>
  );
}