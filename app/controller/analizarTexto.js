const {
  HarmBlockThreshold,
  HarmCategory,
  VertexAI,
} = require("@google-cloud/vertexai");

const db = require("../dataBase/index.js");
const ResultadoRepo = db.resultado;
const Op = db.Sequelize.Op;

const project = "TU-PROYECTO";
const location = "TU-LOCACION";
const textModel = "gemini-1.0-pro";

const vertexAI = new VertexAI({ project: project, location: location });

const generativeModel = vertexAI.getGenerativeModel({
  model: textModel,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  generationConfig: { maxOutputTokens: 256 },
});

async function generateContent(req, res) {
  text =
    "Somos una cadena de restaurantes y quiero que analices el siguiente texto y verifica si el texto es positivo, neutro o negativo.Responde solo con una palabra. Tu respuesta debe de ser menor a 500 caracteres. Text: " +
    req.body.text;
  const request = {
    contents: [{ role: "user", parts: [{ text: text }] }],
  };
  const result = await generativeModel.generateContent(request);
  const response = result.response;

  let resultado = {
    type: response.candidates[0].content.parts[0].text.toLowerCase().includes("positivo")? "positivo": response.candidates[0].content.parts[0].text.toLowerCase().includes("neutro")? "neutro": "negativo",
    text: response.candidates[0].content.parts[0].text,
  };

  await ResultadoRepo.create(resultado)
    .then((data) => {
      res.status(200).send({ message:data});
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
}

function getData(req, res) {
  ResultadoRepo.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials.",
      });
    });
}

module.exports = { generateContent, getData };
