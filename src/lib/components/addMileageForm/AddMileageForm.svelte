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

    const form = superForm(data, {
        validators: zodClient(formSchema),
    });

    const { form: formData } = form;
</script>
<div class="w-full">
    <Form.Field {form} name="mileage">
        <Form.Control let:attrs>
            <Form.Label>Mileage</Form.Label>
            <Input {...attrs} bind:value={$formData.mileage} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>
    <Form.Button class="w-full justify">Add</Form.Button>
</div>
