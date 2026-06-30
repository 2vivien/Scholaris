import React, { useRef, useEffect, useState } from 'react';
import { Bold, Italic, Underline, Link2, List, ListOrdered, Quote, Image as ImageIcon } from 'lucide-react';
import LinkModal from './LinkModal';
import ImageModal from './ImageModal';

interface TextInputEditorProps {
    value: string;
    onChange: (val: string) => void;
}

export default function TextInputEditor({ value, onChange }: TextInputEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [showLink, setShowLink] = useState(false);
    const [showImg, setShowImg] = useState(false);

    const insertHTML = (html: string) => {
        editorRef.current?.focus();
        document.execCommand('insertHTML', false, html);
        onChange(editorRef.current?.innerHTML || '');
    };

    const execCmd = (cmd: string, val = '') => {
        document.execCommand(cmd, false, val);
        onChange(editorRef.current?.innerHTML || '');
    };

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden font-sans bg-white shadow-sm relative">
            <style>{`
                .editor-content:empty::before { content: "Texte de la publication (facultatif)"; color: #94a3b8; pointer-events: none; display: block; }
                .editor-content ul { list-style-type: disc !important; margin-left: 1.5rem !important; padding-left: 0.5rem !important; }
                .editor-content ol { list-style-type: decimal !important; margin-left: 1.5rem !important; padding-left: 0.5rem !important; }
                .editor-content blockquote { border-left: 4px solid #cbd5e1 !important; padding-left: 1rem !important; color: #475569 !important; font-style: italic !important; margin: 0.5rem 0 !important; }
            `}</style>
            <div className="flex items-center gap-1 px-3 py-1.5 border-b border-slate-200 bg-slate-50 flex-wrap">
                <button type="button" onMouseDown={e => { e.preventDefault(); execCmd('bold'); }} className="p-1.5 hover:bg-slate-200/60 rounded text-slate-700 cursor-pointer" title="Gras"><Bold className="w-3.5 h-3.5" /></button>
                <button type="button" onMouseDown={e => { e.preventDefault(); execCmd('italic'); }} className="p-1.5 hover:bg-slate-200/60 rounded text-slate-700 cursor-pointer" title="Italique"><Italic className="w-3.5 h-3.5" /></button>
                <button type="button" onMouseDown={e => { e.preventDefault(); execCmd('underline'); }} className="p-1.5 hover:bg-slate-200/60 rounded text-slate-700 cursor-pointer" title="Souligné"><Underline className="w-3.5 h-3.5" /></button>
                <div className="w-px h-5 bg-slate-200 mx-1" />
                <button type="button" onMouseDown={e => { e.preventDefault(); execCmd('insertUnorderedList'); }} className="p-1.5 hover:bg-slate-200/60 rounded text-slate-700 cursor-pointer" title="Liste à puces"><List className="w-3.5 h-3.5" /></button>
                <button type="button" onMouseDown={e => { e.preventDefault(); execCmd('insertOrderedList'); }} className="p-1.5 hover:bg-slate-200/60 rounded text-slate-700 cursor-pointer" title="Liste ordonnée"><ListOrdered className="w-3.5 h-3.5" /></button>
                <button type="button" onMouseDown={e => { e.preventDefault(); execCmd('formatBlock', 'blockquote'); }} className="p-1.5 hover:bg-slate-200/60 rounded text-slate-700 cursor-pointer" title="Citation"><Quote className="w-3.5 h-3.5" /></button>
                <div className="w-px h-5 bg-slate-200 mx-1" />
                <button type="button" onMouseDown={e => { e.preventDefault(); setShowLink(true); }} className="p-1.5 hover:bg-slate-200/60 rounded text-slate-700 cursor-pointer" title="Ajouter un lien"><Link2 className="w-3.5 h-3.5" /></button>
                <button type="button" onMouseDown={e => { e.preventDefault(); setShowImg(true); }} className="p-1.5 hover:bg-slate-200/60 rounded text-slate-700 cursor-pointer" title="Ajouter une image"><ImageIcon className="w-3.5 h-3.5" /></button>
            </div>
            
            <div 
                ref={editorRef} contentEditable={true} onInput={() => onChange(editorRef.current?.innerHTML || '')}
                className="w-full px-4 py-3 min-h-[12rem] focus:outline-none overflow-y-auto text-sm leading-relaxed editor-content bg-white text-slate-800" 
            />

            {showLink && <LinkModal onClose={() => setShowLink(false)} onInsert={insertHTML} />}
            {showImg && <ImageModal onClose={() => setShowImg(false)} onInsert={insertHTML} />}
        </div>
    );
}
