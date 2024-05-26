<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import * as Select from "$lib/components/ui/select";
    import { settingsFormSchema } from "$lib/components/settingsForm/settingsFormSchema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    import type {Car} from "$lib/types/car";

    export let schema: SuperValidated<Infer<typeof settingsFormSchema>>;
    export let cars: Car[];

    const form = superForm($schema, {
        validators: zodClient(settingsFormSchema),
    });

    const { form: formData } = form;
    //const selectedName = cars.find(c => c.id === $formData.primaryCar)?.name;
    $: selectedCar = $formData.primaryCar ? {
        label: cars.find(c => c.id === $formData.primaryCar)?.name,
        value: $formData.primaryCar
    } : undefined;
</script>

<Form.Field {form} name="primaryCar">
    <Form.Control let:attrs>
        <Form.Label>Primary Car</Form.Label>
        <Select.Root selected={selectedCar} onSelectedChange={(v) => $formData.primaryCar = v.value}>
            <Select.Trigger {...attrs}>
                <Select.Value placeholder="Select your primary car" />
            </Select.Trigger>
            <Select.Content>
                <Select.Item value={undefined}>None</Select.Item>
                {#each cars as car}
                    <Select.Item value={car.id}>{car.name}</Select.Item>
                {/each}
            </Select.Content>
        </Select.Root>
        <input hidden bind:value={$formData.primaryCar} name={attrs.name} />
    </Form.Control>
</Form.Field>
