import type { PresetName } from '../../theme/presets.js';
type RangeField = {
    key: string;
    label: string;
    type: 'range';
    min: number;
    max: number;
    step: number;
};
type ToggleField = {
    key: string;
    label: string;
    type: 'toggle';
};
export type SettingsField = RangeField | ToggleField;
interface Props {
    fields: SettingsField[];
    values: Record<string, number | boolean>;
    theme: PresetName;
}
declare const Settings: import("svelte").Component<Props, {}, "values" | "theme">;
type Settings = ReturnType<typeof Settings>;
export default Settings;
