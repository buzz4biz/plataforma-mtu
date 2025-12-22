import { Streamdown } from "streamdown";
import AutoSaveInput from "./AutoSaveInput";
import AutoSaveCheckbox from "./AutoSaveCheckbox";
import AutoSaveTextarea from "./AutoSaveTextarea";

interface RichContentRendererProps {
    content: string;
    moduleId: string;
}

export default function RichContentRenderer({ content, moduleId }: RichContentRendererProps) {
    // Split content by special markers: 
    // {{input:id}}
    // {{checkbox:id:label}}
    // {{textarea:id}}
    const parts = content.split(/({{\s*(?:input|checkbox|textarea):[^}]+?\s*}})/g);

    return (
        <div className="prose prose-neutral max-w-none">
            {parts.map((part, index) => {
                // Check if part is a marker
                const markerMatch = part.match(/{{\s*(input|checkbox|textarea):([^}]+?)\s*}}/);

                if (markerMatch) {
                    const [, type, params] = markerMatch;

                    if (type === "input") {
                        const id = params.trim();
                        return <AutoSaveInput key={index} moduleId={moduleId} exerciseId={id} />;
                    }

                    if (type === "textarea") {
                        const id = params.trim();
                        return <AutoSaveTextarea key={index} moduleId={moduleId} exerciseId={id} minHeight="100px" />;
                    }

                    if (type === "checkbox") {
                        // params might imply "id:label"
                        // We need to handle potential colons in label, so we limit split
                        const firstColonIndex = params.indexOf(':');
                        if (firstColonIndex !== -1) {
                            const id = params.substring(0, firstColonIndex).trim();
                            const label = params.substring(firstColonIndex + 1).trim();
                            return <AutoSaveCheckbox key={index} moduleId={moduleId} exerciseId={id} label={label} />;
                        }
                    }
                }

                // Render as standard markdown
                // Only render if not empty string to avoid empty paragraphs
                if (!part) return null;

                return <Streamdown key={index}>{part}</Streamdown>;
            })}
        </div>
    );
}
