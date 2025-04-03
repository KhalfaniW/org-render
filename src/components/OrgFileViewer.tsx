import { useEffect, useState, type FC } from "react";
import { orgToHtml } from "../utils/orgToReact";

interface OrgFileViewerProps {
  content: string;
}

export const OrgFileViewer: FC<OrgFileViewerProps> = ({ content }) => {
  const [htmlContent, setHtmlContent] = useState<string>("");

  useEffect(() => {
    const updateContent = async () => {
      try {
        const html = await orgToHtml(content);
        setHtmlContent(html);
      } catch (error) {
        console.error("Error processing org content:", error);
        setHtmlContent("<div>Error processing content</div>");
      }
    };

    updateContent();
  }, [content]);

  return (
    <div
      className="org-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};
