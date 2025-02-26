class ResumePreview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    this.render();
  }

  render(): void {
    const resumeHtml: string = this.getAttribute("template") || "<h1>Resume Template</h1>";
    
    this.shadowRoot!.innerHTML = `
      <style>
        @page {
          size: A4;
          margin: 20mm;
        }
        :host {
          display: block;
          width: 210mm;
          min-height: 297mm;
          background: white;
          padding: 20mm;
          font-family: Arial, sans-serif;
          line-height: 1.5;
        }
        .page {
          page-break-after: always;
          border-bottom: 1px dashed #ccc;
          padding-bottom: 20px;
        }
        
      </style>
      <div class="resume-content">
        ${resumeHtml}
      </div>
    `;
  }

  print(): void {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write('<html><head><title>Print Resume</title></head><body>');
      doc.write(this.shadowRoot!.innerHTML);
      doc.write('</body></html>');
      doc.close();

      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    }

    document.body.removeChild(iframe);
  }
}

customElements.define("resume-preview", ResumePreview);
