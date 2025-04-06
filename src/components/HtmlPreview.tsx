// a react component wrapping a custom element
// element should render the provided html
// styleing should be isolated
import React, { useEffect, useRef } from 'react';

const HtmlPreview: React.FC<{ html: string }> = ({ html }) => {
    const customElementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (customElementRef.current) {
            const shadowRoot = customElementRef.current.shadowRoot || customElementRef.current.attachShadow({ mode: 'open' });

            // Clear shadow DOM before appending new content
            shadowRoot.innerHTML = '';

            // Reset styles to ensure no external styles are applied
            const styleReset = document.createElement('style');
            styleReset.textContent = `
                :host {
                    all: unset;
                }
                div {
                    text-align: initial; /* Reset text alignment */
                }
            `;
            shadowRoot.appendChild(styleReset);

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // Extract and append styles from <head>
            const headStyles = doc.head.querySelectorAll('style');
            headStyles.forEach((styleTag) => {
                shadowRoot.appendChild(styleTag.cloneNode(true));
            });

            // Create a container to mimic the <body> tag
            const bodyContainer = document.createElement('div');
            bodyContainer.style.overflow = 'hidden'; // Retain only overflow styling

            // Create a scaling wrapper for the content
            const scalingWrapper = document.createElement('div');
            scalingWrapper.style.transformOrigin = 'center top'; // Adjust origin to center horizontally
            scalingWrapper.style.width = '793px'; // Match the content width
            scalingWrapper.style.height = 'auto';
            scalingWrapper.style.position = 'relative'; // Ensure proper positioning
            scalingWrapper.style.margin = '0 auto'; // Center horizontally within the container

            // Calculate the scale factor to fit the width to 200px
            const scaleFactor = 200 / 793;
            scalingWrapper.style.transform = `scale(${scaleFactor})`;

            // Append content from <body> to the scaling wrapper
            Array.from(doc.body.childNodes).forEach((node) => {
                scalingWrapper.appendChild(node.cloneNode(true));
            });

            bodyContainer.appendChild(scalingWrapper);
            shadowRoot.appendChild(bodyContainer);
        }
    }, [html]);

    return (
        <div
            className="w-[200px] h-[266.67px] flex justify-center items-center overflow-hidden rounded" // Apply view box styling here
        >
            <div
                ref={customElementRef}
                className="w-[793px] h-full border-none print:block"
                style={{
                    display: window.innerHeight / window.innerWidth > 0.75 ? 'none' : 'block',
                }}
            />
        </div>
    );
};

export default HtmlPreview;
