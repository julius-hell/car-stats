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

    const { form: formData, enhance } = form;
</script>
<div class="max-w-screen-md mx-auto">
    <form method="POST" use:enhance action="/car/add?/addCar">
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
        <Form.Button>Add Car</Form.Button>
    </form>
</div>
