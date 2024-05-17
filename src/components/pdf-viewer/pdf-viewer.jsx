import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import { Pagination, PaginationItem } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import PropTypes from "prop-types";
import "./style.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function PdfViewer({ urlPdf }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  //   const [totalPages, setTotalPages] = useState(0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    // setTotalPages(numPages);
  }

  //   const handlePageChange = (event, newPage) => {
  //     setPageNumber(newPage);
  //   };
  //   const goToPreviousPage = () => {
  //     setPageNumber((prevPage) => Math.max(1, prevPage - 1));
  //   };

  //   const goToNextPage = () => {
  //     setPageNumber((prevPage) => Math.min(numPages, prevPage + 1));
  //   };

  return (
    <div className="pdf-viewer">
      <Document
        file={urlPdf}
        loading="Chargement du fichier pdf..."
        error="Impossible de charger le fichier pdf..."
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(e) => alert(e)}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <Pagination
        className="flex justify-center"
        count={numPages}
        onChange={(e, newPage) => setPageNumber(newPage)}
        color="primary"
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBack, next: ArrowForward }}
            {...item}
          />
        )}
      />
      {/* {numPages > 0 && (
        <div>
          <p>
            Page {pageNumber} sur {numPages}
          </p>
        </div>
      )} */}
    </div>
  );
}

PdfViewer.propTypes = {
  urlPdf: PropTypes.string.isRequired,
};
