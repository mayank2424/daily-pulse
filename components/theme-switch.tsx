import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function ThemeSwitch(props: { hideLabel: boolean }) {
    const { hideLabel } = props;

    const { theme, setTheme } = useTheme();

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {
                !hideLabel &&
                <label
                    className="Label"
                    htmlFor="airplane-mode"
                    style={{ paddingRight: 15 }}
                >
                    Switch Theme
                </label>
            }
            <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm dark:bg-slate-800/80"
                aria-label="Toggle theme"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
        </div>
    )
}
