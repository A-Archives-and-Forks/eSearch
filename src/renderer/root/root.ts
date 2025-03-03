import { view } from "dkh-ui";
import { t, lan } from "../../../lib/translate/translate";

function initStyle(
    store: typeof import("../../../lib/store/renderStore")["default"],
) {
    function setCSSVar(name: string, value: string) {
        if (value) document.documentElement.style.setProperty(name, value);
    }
    const 模糊 = store.get("全局.模糊");
    if (模糊 !== 0) {
        setCSSVar("--blur", `blur(${模糊}px)`);
    } else {
        setCSSVar("--blur", "none");
    }

    setCSSVar("--alpha", `${store.get("全局.不透明度") * 100}%`);

    const theme = store.get("全局.主题");
    setCSSVar("--bar-bg0", theme.light.barbg);
    setCSSVar("--bg", theme.light.bg);
    setCSSVar("--emphasis-color", theme.light.emphasis);
    setCSSVar("--d-bar-bg0", theme.dark.barbg);
    setCSSVar("--d-bg", theme.dark.bg);
    setCSSVar("--d-emphasis-color", theme.dark.emphasis);
    setCSSVar("--font-color", theme.light.fontColor);
    setCSSVar("--d-font-color", theme.dark.fontColor);
    setCSSVar("--icon-color", theme.light.iconColor);
    setCSSVar("--d-icon-color", theme.dark.iconColor);

    const 字体 = store.get("字体");
    setCSSVar("--main-font", 字体.主要字体);
    setCSSVar("--monospace", 字体.等宽字体);

    lan(store.get("语言.语言"));

    const topTip = view()
        .class("bar")
        .style({
            position: "fixed",
            pointerEvents: "none",
            padding: "2px",
            borderRadius: "4px",
            width: "auto",
            height: "auto",
            zIndex: 9999,
            transition: "var(--transition) opacity",
        })
        .addInto()
        .bindSet((v: string, el) => {
            el.textContent = v;
        });

    window.addEventListener("pointermove", (e) => {
        const el = e.target as HTMLElement;
        const tEl = el.closest("[data-title]");
        if (!tEl) {
            topTip.style({ opacity: 0 });
        } else {
            const title = tEl.getAttribute("data-title");
            const rect = tEl.getBoundingClientRect();
            topTip.sv(title);
            const tw = topTip.el.offsetWidth;
            const th = topTip.el.offsetHeight;
            const ow = window.innerWidth;
            const oh = window.innerHeight;
            topTip.style({
                opacity: 1,
                left: `${Math.max(0, Math.min(rect.left + rect.width / 2 - tw / 2, ow - tw))}px`,
                top: `${Math.max(0, Math.min(rect.top - th - 4, oh - th))}px`,
            });
        }
    });
}

// @auto-path:../assets/icons
function getImgUrl(name: string) {
    return new URL(`../assets/icons/${name}`, import.meta.url).href;
}

function setTitle(t: string) {
    document.title = `eSearch ${t}`;
    // todo 国际化
}

export { initStyle, getImgUrl, setTitle };
