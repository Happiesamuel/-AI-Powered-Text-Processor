export async function languageDect(text) {
  const languageDetectorCapabilities =
    await self.ai.languageDetector.capabilities();
  const canDetect = languageDetectorCapabilities.capabilities;
  let detector;
  if (canDetect === "no") {
    // The language detector isn't usable.
    return;
  }
  if (canDetect === "readily") {
    // The language detector can immediately be used.
    detector = await self.ai.languageDetector.create();
  } else {
    // The language detector can be used after model download.
    detector = await self.ai.languageDetector.create({
      monitor(m) {
        m.addEventListener("downloadprogress", (e) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
        });
      },
    });
    await detector.ready;
  }
  const a = detector.detect(text);
  return a;
}

export async function initTranslator(from, to) {
  try {
    const translatorInstance = await self.ai.translator.create({
      sourceLanguage: from,
      targetLanguage: to,
      monitor(m) {
        m.addEventListener("downloadprogress", (e) => {
          console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
        });
      },
    });
    return translatorInstance;
  } catch (error) {
    console.error("Error initializing translator:", error);
  }
}
