import { useState } from "react";
import * as XLSX from "xlsx";

function App() {
  const [error, setError] = useState([]);

  function checkObject(data) {
    let errors = []
    if (!Object.hasOwn(data[0], "Savol")) {
      errors.push("Savol qismi yo'q");
    }
    if (!Object.hasOwn(data[0], "A")) {
      errors.push("A qismi yo'q");
    }
    if (!Object.hasOwn(data[0], "B")) {
      errors.push("B qismi yo'q");
    }
    if (!Object.hasOwn(data[0], "C")) {
      errors.push("C qismi yo'q");
    }
    if (!Object.hasOwn(data[0], "D")) {
      errors.push("D qismi yo'q");
    }
    if (!Object.hasOwn(data[0], "Javob")) {
      errors.push("Javob qismi yo'q");
    }

    for (let i = 0; i < data.length; i++) {
      let c = data[i];
      if (!Object.hasOwn(c, "Savol")) {
        errors.push("Savol qismi yo'q " + (i + 2));
      }
      if (!Object.hasOwn(c, "A")) {
        errors.push("A qismi yo'q" + (i + 2));
      }
      if (!Object.hasOwn(c, "B")) {
        errors.push("B qismi yo'q" + (i + 2));
      }
      if (!Object.hasOwn(c, "C")) {
        errors.push("C qismi yo'q" + (i + 2));
      }
      if (!Object.hasOwn(c, "D")) {
        errors.push("D qismi yo'q" + (i + 2));
      }
      if (!Object.hasOwn(c, "Javob")) {
        errors.push("Javob qismi yo'q" + (i + 2));
      }
    }

    if(errors?.length) {
      setError(errors)
    } else {
      download("test", objToString(data));
    }

  }

  function objToString(data) {
    let res = "";
    for (let obj of data)
      res =
        res +
        Object.entries(obj).reduce((str, [p, val]) => {
          if (p.trim() === "Savol") {
            return `${val.trim()}?\n`;
          } else if (p.trim() === "Javob") {
            return `${str}ANSWER: ${String(val).trim().toUpperCase()}\n`;
          } else return `${str}${p.trim()}. ${String(val).trim()}\n`;
        }, "") +
        "\n";
    return res;
  }

  function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text)
    );
    element.setAttribute("download", filename);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function loadCertificates(file) {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file.target.files[0]);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((data) => {
      checkObject(data);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center mt-[50px]">
      <div className="relative w-[500px] group hover:bg-blue-300 flex flex-col justify-center items-center border-[2px] border-slate-800 rounded-md p-[5px]">
        <svg
          className="w-[35px] h-[35px]"
          fill="blue"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-lg text-slate-700 group-hover:text-blue-700 font-bold mt-[5px]">
          Faylni yuklang
        </div>
        <input
          type="file"
          onChange={loadCertificates}
          className="w-full h-full opacity-0 absolute top-0 left-0 cursor-pointer"
        />
      </div>
      <ul className={`${error?.length === 0 && 'hidden'} w-[500px] border-[2px] border-slate-800 rounded-md mt-[20px] p-[15px]`}>
        {error?.map((e, i) => (
          <li key={i} className="text-red-600 underline">{e}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
