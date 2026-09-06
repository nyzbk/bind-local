export const APP_NAME = "Bind";
export const APP_TAGLINE = "Images to PDF & PDF to Images";
export const APP_DESCRIPTION =
  "Convert JPG, PNG and WebP images into a multipage PDF, or extract PDF pages as PNG, JPEG or WebP. 100% private — files never leave this browser. Free, no signup, no watermark.";

export const ADSENSE_CLIENT = "ca-pub-7636435144500691";
export const AGENCY_NAME = "Ultimatum";
export const AGENCY_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_AGENCY_URL) ||
  "https://ultimatum.studio";

export const MEMORY_WARN_BYTES = 80 * 1024 * 1024;
export const MAX_CANVAS_EDGE = 4096;
export const MAX_PAGE_POINTS = 14400;

export const ACCEPT_IMAGES = ".jpg,.jpeg,.png,.webp,.bmp,.gif,image/jpeg,image/png,image/webp,image/bmp,image/gif";
export const ACCEPT_PDF = ".pdf,application/pdf";

export type FaqItem = { q: string; a: string };
export const FAQ: readonly FaqItem[] = [
  {
    q: "Does Bind upload my files to a server?",
    a: "No. Conversion runs inside this browser tab with pdf-lib, pdf.js and the Canvas API. Images and PDFs are never posted to Bind’s hosting, never stored in a cloud bucket, and never sent to a conversion API. If you disconnect after the page has loaded, the converter still works. That is the point of a private tool: a scan of a passport, a medical form or a lease can become a PDF without leaving the device that photographed it.",
  },
  {
    q: "Do I need an account or a daily limit?",
    a: "No account, no email gate, no watermark, no artificial cap on how many files you convert. The only ceiling is the memory of the browser you are using. A recent phone handles a few dozen photos without drama. A 200-page PDF at 3\u00d7 scale on an older iPad may stall — lower the scale or split the range. We do not throttle successful jobs to sell a paid plan.",
  },
  {
    q: "Which image formats can I turn into a PDF?",
    a: "JPEG, JPG, PNG, WebP, BMP and static GIF. Drop them in any mix, reorder the list, then bind. HEIC and HEIF from iPhone Camera are not decoded here — convert those with HEIC Local first, then bring the JPEG or PNG into Bind. Animated GIF uses the first frame only. Vector SVG is out of scope; Bind builds raster pages, not a drawing editor.",
  },
  {
    q: "How do page size, margins and Contain / Cover / Stretch work?",
    a: "Page size is the paper you are targeting: A4, Letter, Legal or a square. Margins keep photos off the edge for printing. Contain fits the whole image inside the content box and may letterbox. Cover fills the box and may crop overflow. Stretch fills the box and may distort. For a scan of a document, use Contain plus modest margins. For a full-bleed photo sheet, use Cover. Stretch is a last resort when you explicitly want the image to match the page regardless of aspect ratio.",
  },
  {
    q: "Can I extract only some pages from a PDF?",
    a: "Yes. Leave the control on all pages, or type a range such as 1-3,5,8-10. Spaces are ignored. Out-of-range numbers are dropped rather than crashing the job. Each selected page is rasterized at the scale you pick (1\u00d7, 2\u00d7 or 3\u00d7) and saved as PNG, JPEG or WebP. Download one page or a ZIP of the set. Encrypted or broken PDFs surface an error instead of a blank ZIP.",
  },
  {
    q: "PNG, JPEG or WebP — which should I export?",
    a: "PNG is lossless and the right default for text, UI screenshots, stamps and signatures. JPEG is smaller and fine for photographs; pick a quality that still reads. WebP is usually smaller than JPEG at similar visual quality and works in modern browsers and many CMS pipelines, but some print shops still want JPEG or PNG. Scale multiplies pixels: 2\u00d7 of an A4 page is already a large PNG. Start at 2\u00d7 PNG for documents you will OCR later; drop to 1\u00d7 JPEG for a quick preview pack.",
  },
  {
    q: "Why does a page look softer than the original PDF?",
    a: "A PDF page is often vectors and fonts. Bind rasterizes that page into pixels. At 1\u00d7 the pixel grid may be too coarse for small type. Raise scale to 2\u00d7 or 3\u00d7, export PNG, and avoid stretching. Scanned PDFs that are already bitmaps cannot gain detail Bind never had — you only choose how large to paint the existing bitmap. If a font looks wrong, the file may use a subsetted font pdf.js cannot reconstruct; try a different PDF export from the original app.",
  },
  {
    q: "Does Bind work on iPhone and iPad?",
    a: "Yes. Safari on iOS is a supported path for both directions. Use the file picker or Files app, then Bind or extract. After a PDF is ready, the share sheet can hand it to Mail, Files or another app when the browser exposes Web Share. Very large batches still hit Safari memory first — convert in groups of 10–20 photos rather than 200 at once. Add to Home Screen if you want the tool as an icon; it remains a website, not a native App Store binary.",
  },
  {
    q: "Is there a file-size limit?",
    a: "Bind does not impose a product quota. The browser does. A warning appears around 80 MB of source bytes because heaps above that often fail on phones. A 40-megapixel photo is heavier than it looks. If the tab reloads or the job dies, reduce count, shrink images first, or extract a narrower page range. Desktop Chrome usually survives larger jobs than mobile Safari. Nothing is queued on a server when a job fails — there is no server job.",
  },
  {
    q: "Can I reorder images before making the PDF?",
    a: "Yes. Drag rows on a pointer device. On a phone use the up and down controls on each row. The PDF page order matches the list, top to bottom. Filenames are sanitized for download but do not change page order. Duplicate a photo in the list if you need it twice; remove a row if it was added by mistake. Clearing the list revokes object URLs so the tab does not keep thumbnails in memory.",
  },
  {
    q: "How is Bind different from Folio, Fit or a cloud converter?",
    a: "Folio splits, compresses and (where enabled) merges PDFs — it does not turn a folder of JPEGs into a new document. Fit resizes and crops raster images for the web. Bind’s job is the hinge between photos and pages: images become a multipage PDF, and PDF pages become images. Cloud converters upload bytes to a farm. Bind never does. If you need OCR, electronic signatures or form filling, use a dedicated editor after Bind has produced the file; those features are intentionally out of scope.",
  },
  {
    q: "Will my PDF open in Acrobat, Preview and a printer?",
    a: "Bind writes a straightforward PDF with one raster image per page, sized to the paper you chose. Acrobat, Apple Preview, Chrome, most printers and most government upload portals accept that pattern. We do not embed JavaScript, attachments or PDF/A archival profiles. If a portal rejects the file, it is usually because of an encryption or PDF/A rule on their side — print-to-PDF from the preview, or ask them which profile they require. Colors follow the source image, not a CMYK press profile.",
  },
  {
    q: "Who operates Bind and how do I get support?",
    a: "Bind is a free utility from Ultimatum. There is no ticket portal and no guaranteed SLA — it is a browser page, not a hosted conversion API. For a broken page, a policy question or a copyright notice, email ultaultimatum@gmail.com from the Contact page. Do not attach passports or medical scans to that email; if the converter failed, describe the browser, page count and the error text instead of sending the file.",
  },
  {
    q: "Will the bound PDF appear in my iPhone Photos album?",
    a: "No. Photos is for stills and Live Photos. A PDF is a Files object. After Bind, save into Files or iCloud Drive. Recents in Photos still holds the original JPEGs, not the document you just made.",
  },
  {
    q: "If I send the pages as WhatsApp photos, is that the same as sending the PDF?",
    a: "No. Photo send recodes frames. Page 2–12 may never leave as a document. Send the PDF as a document if the other person must keep the page order. Bind does not sit inside WhatsApp.",
  },
  {
    q: "Should I email the PDF or the ZIP of extracted pages?",
    a: "Email the PDF when the recipient asked for a document. Email extracted JPEGs only when a portal demands \u201cJPG of page 3\u201d. A 3\u00d7 PNG ZIP of a long report will blow past Gmail\u2019s 25 MB attachment cap and become a Drive link.",
  },
  {
    q: "Does Bind merge two PDFs or strip GPS from the photos?",
    a: "No. Merge/split/compress is a different tool. GPS/EXIF is a different tool. Bind\u2019s job is pages from pictures and pictures from pages in this tab.",
  },
];

export const iphoneFaq: readonly FaqItem[] = [
  {
    q: "Safari showed the PDF and Files is empty. Did Bind fail?",
    a: "Often the blob opened in a preview tab. Use Share \u2192 Save to Files. Then open that Files object. An on-screen preview is not a saved document.",
  },
  {
    q: "Can I pick HEIC from Camera Roll and bind?",
    a: "Not in Bind v1. Convert HEIC to JPEG first, then drop the JPEG. Conversion is not a PDF. Order the JPEGs after conversion.",
  },
  {
    q: "Does Add to Home Screen make Bind a native app that writes Photos?",
    a: "No. It is still this website. Output is still a file you save into Files.",
  },
  {
    q: "iCloud Photos uploaded my receipts. Is the PDF in iCloud Photos too?",
    a: "Only if you saved the PDF into a Photos-backed place, which you usually cannot. Save the PDF to Files / iCloud Drive. The album originals are still JPEGs.",
  },
];

export const whatsappFaq: readonly FaqItem[] = [
  {
    q: "They said they got one blurry photo. Where are the other pages?",
    a: "You sent a photo, not a document. WhatsApp recoded one frame. Send the PDF as a document, or extract pages and send those files on purpose.",
  },
  {
    q: "Is send-as-document safer for quality?",
    a: "It is closer to the bytes you picked. Those bytes must already be the Bind download. Document send will also ship a huge scan if you picked the wrong file.",
  },
  {
    q: "WhatsApp Desktop grabbed a folder of JPEGs. Is that a PDF?",
    a: "No. That is a stack of pictures. Bind first, then attach the PDF from Downloads.",
  },
  {
    q: "Status or View once \u2014 does that bind pages?",
    a: "No. Those are delivery modes. They do not create a multipage PDF and they do not rewrite Files.",
  },
];

export const emailFaq: readonly FaqItem[] = [
  {
    q: "Gmail turned my PDF into a Drive link. Did Bind break?",
    a: "Gmail\u2019s 25 MB attachment cap did. Official help: if attachments exceed 25 MB, Gmail removes them and inserts a Drive link. Shrink pages, extract a range, or send fewer images. Bind does not talk to Drive.",
  },
  {
    q: "The clerk wants JPG of page 3, not a PDF. Do I still mail the PDF?",
    a: "No. Use PDF to Images, range 3, JPEG or PNG, then attach that still \u2014 or upload it in the portal. Mailing the whole PDF is the wrong object.",
  },
  {
    q: "Is a ZIP of 3\u00d7 PNG pages a good email?",
    a: "Rarely. It is often larger than the PDF and blows the cap. Mail the PDF, or extract only the pages they named, at 1\u00d7 or 2\u00d7.",
  },
  {
    q: "Does Bind send the email for me?",
    a: "No. It writes a blob in this tab. You attach that blob in Mail. Closing the tab discards the blob if you never saved.",
  },
];
