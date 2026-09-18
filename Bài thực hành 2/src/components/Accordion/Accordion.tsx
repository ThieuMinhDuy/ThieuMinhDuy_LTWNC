import {createContext, useContext, useState} from "react";
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./Accordion.css";

interface AccordionContextType {
    openItem: string | null;
    setOpenItem: (itemId: string | null) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

interface AccordionItemContextType {
    id: string;
    isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextType | null>(null);

interface AccordionProps {
    children: React.ReactNode;
}

function Accordion({children}: AccordionProps) {
    const [openItem, setOpenItem] = useState<string | null>(null);

    return (
        <AccordionContext.Provider value={{openItem, setOpenItem}}>
            <div className="accordion-root">
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

interface AccordionItemProps {
    id: string;
    children: React.ReactNode;
}

function AccordionItem({id, children}: AccordionItemProps) {
    const context = useContext(AccordionContext);

    if (!context) {
        throw new Error("AccordionItem must be used inside Accordion");
    }

    const { openItem } = context;
    const isOpen = openItem === id;

    return (
        <AccordionItemContext.Provider value={{ id, isOpen }}>
            <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
}

interface AccordionTriggerProps {
    children: React.ReactNode;
}

function AccordionTrigger({children}: AccordionTriggerProps) {
    const accordionContext = useContext(AccordionContext);
    const itemContext = useContext(AccordionItemContext);

    if (!accordionContext) {
        throw new Error("AccordionTrigger must be used inside Accordion");
    }

    if (!itemContext) {
        throw new Error("AccordionTrigger must be used inside AccordionItem");
    }

    const { setOpenItem } = accordionContext;
    const { id, isOpen } = itemContext;

    const handleClick = () => {
        if (isOpen) {
            setOpenItem(null);
        } else {
            setOpenItem(id);
        }
    };

    return (
        <button className="accordion-trigger" onClick={handleClick}>
            <span>{children}</span>
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
    );
}

interface AccordionContentProps {
    children: React.ReactNode;
}

function AccordionContent({children}: AccordionContentProps) {
    const itemContext = useContext(AccordionItemContext);

    if (!itemContext) {
        throw new Error("AccordionContent must be used inside AccordionItem");
    }

    const { isOpen } = itemContext;

    if (!isOpen) {
        return null;
    }

    return (
        <div className="accordion-content">
            {children}
        </div>
    );
}

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export default Accordion;