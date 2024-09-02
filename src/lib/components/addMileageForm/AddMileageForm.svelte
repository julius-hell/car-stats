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
    import {Checkbox} from "$lib/components/ui/checkbox";
    import {getGeolocation} from "$lib/geolocation";
    export let data: SuperValidated<Infer<typeof formSchema>>;

    const form = superForm(data, {
        validators: zodClient(formSchema),
    });

    const { form: formData } = form;

    let latInput: HTMLInputElement;
    let lngInput: HTMLInputElement;

    async function onChange(value) {
      if(value) {
        const position = await getGeolocation(navigator);
        latInput.value = position.latitude.toString();
        lngInput.value = position.longitude.toString();
      } else {
        latInput.value = "";
        lngInput.value = "";
      }
    }
</script>

<Form.Field {form} name="mileage">
    <Form.Control let:attrs>
        <Form.Label>Mileage</Form.Label>
        <Input {...attrs} bind:value={$formData.mileage} />
    </Form.Control>
    <Form.FieldErrors />
</Form.Field>
<Form.Field {form} name="includeLocation" class="flex flex-row items-start space-x-3 space-y-0 mb-2">
    <Form.Control let:attrs>
        <Checkbox {...attrs} bind:checked={$formData.includeLocation} onCheckedChange={onChange} />
        <input name={attrs.name} value={$formData.includeLocation} hidden />
        <div class="space-y-1 leading-none">
            <Form.Label>Include location</Form.Label>
        </div>
    </Form.Control>
</Form.Field>
<Form.Field {form} name="latitude">
    <Form.Control let:attrs>
        <input {...attrs} hidden bind:this={latInput} />
    </Form.Control>
</Form.Field>
<Form.Field {form} name="longitude">
    <Form.Control let:attrs>
        <input {...attrs} hidden bind:this={lngInput} />
    </Form.Control>
</Form.Field>
<Form.Button class="w-full justify">Add</Form.Button>
