import {computed, isReactive, isRef, nextTick, Ref, ref, toRaw, toRef} from "vue";

export const unsavedChanges = (form: Ref, autoStart: boolean = true) => {
    // @ts-ignore
    const formRef = ref(form); // Create a reactive reference to the form
    const started = ref(autoStart); // Reactive reference to track if the dirtiness tracking has started

    // Computed property to hold the initial state of the form
    const initial = computed(() => {
        // If tracking hasn't started, return an empty object
        if (!started.value) return {};
        // Otherwise, return a deep clone of the current form state
        else return structuredClone(toRaw(formRef.value));
    });

    // Computed property to determine which fields have been modified aka the array of dirty field names
    const dirties = computed(() => {
        // debugger;
        // If tracking hasn't started, return an empty array
        if (!started.value) return [];
        // Filter the form entries and compare each value to its initial state
        else
            return (
                Object.entries(formRef.value)
                    .filter(([key, value]) => {
                        // Check if the current value differs from the initial value
                        if(isReactive(value)) return false;
                        // if(initial.value[key] !== value){
                        //     console.log(`VALUE CHECK: ${key}`, initial.value[key])
                        //     console.log(`VALUE CHECK: ${key}`, isReactive(initial.value[key]))
                        //     console.log(`VALUE CHECK: ${key}`, value)
                        //     console.log(`VALUE CHECK: ${key}`, isReactive(value) ? toRaw(value) : value)
                        // }
                        return initial.value[key] !== value;
                    })
                    // Map the results to return only the keys of the dirty fields
                    .map(([key]) => key)
            );
    });

    // Computed property that indicates if there are any dirty fields
    const isDirty = computed(() => Boolean(dirties.value.length));

    // Function to restart the tracking of dirtiness
    const restart = () => {
        started.value = false; // Stop tracking
        nextTick(); // Wait for the next DOM update cycle to make sure the computed values return empty objects and strings
        started.value = true; // Restart tracking
    };

    // Function to start the dirtiness tracking
    const start = () => (started.value = true);

    // Return the computed properties and functions for external use
    return { isDirty, dirties, start, restart };
};
