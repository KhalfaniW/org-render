import { useEffect, useState, type FC } from "react";
import { orgToHtml, processOrgContent } from "../utils/orgToReact";

interface OrgFileViewerProps {
  content: string;
}

export const OrgFileViewer: FC<OrgFileViewerProps> = ({ content }) => {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [reactContent, setReactContent] = useState<any>(null);
  useEffect(() => {
    processOrgContent(content).then(({ result }) => {
      setReactContent(result);
    });
  }, [content]);

  return <>{reactContent}</>;
};
