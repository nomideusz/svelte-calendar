type PlannerDayLayout = 'vertical' | 'horizontal';
interface Props {
    layout?: PlannerDayLayout;
    [key: string]: unknown;
}
declare const PlannerDay: import("svelte").Component<Props, {}, "">;
type PlannerDay = ReturnType<typeof PlannerDay>;
export default PlannerDay;
