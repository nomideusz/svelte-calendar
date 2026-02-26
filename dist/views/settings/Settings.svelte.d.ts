import type { PresetName } from '../../theme/presets.js';
type BaseField = {
    key: string;
    label: string;
    group?: string;
};
type RangeField = BaseField & {
    type: 'range';
    min: number;
    max: number;
    step: number;
    enabledWhen?: string;
};
type ToggleField = BaseField & {
    type: 'toggle';
};
type SelectField = BaseField & {
    type: 'select';
    options: {
        value: string;
        label: string;
    }[];
};
type SegmentField = BaseField & {
    type: 'segment';
    options: {
        value: string;
        label: string;
    }[];
};
export type SettingsField = RangeField | ToggleField | SelectField | SegmentField;
interface Props {
    fields: SettingsField[];
    values: Record<string, string | number | boolean>;
    theme: PresetName;
}
declare const Settings: import("svelte").Component<Props, {}, "values" | "theme">;
type Settings = ReturnType<typeof Settings>;
export default Settings;
