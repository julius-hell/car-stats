<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { formSchema } from "./formSchema";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data: SuperValidated<Infer<typeof formSchema>>;

    export let buttonType = "Add" as "Add" | "Update"

    const form = superForm($data, {
        validators: zodClient(formSchema),
    });

    const { form: formData } = form;
</script>

        <Form.Field {form} name="name">
            <Form.Control let:attrs>
                <Form.Label>Name</Form.Label>
                <Input {...attrs} bind:value={$formData.name} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="make">
            <Form.Control let:attrs>
                <Form.Label>Make</Form.Label>
                <Input {...attrs} bind:value={$formData.make} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Field {form} name="model">
            <Form.Control let:attrs>
                <Form.Label>Model</Form.Label>
                <Input {...attrs} bind:value={$formData.model} />
            </Form.Control>
            <Form.FieldErrors />
        </Form.Field>
        <Form.Button class="w-full">{ buttonType } Car</Form.Button>

