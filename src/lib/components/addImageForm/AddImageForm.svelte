<script>
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { Button} from "$lib/components/ui/form";
</script>

<div class="grid w-full items-center gap-2">
    <Label for="picture">Picture</Label>
    <Input id="picture" name="picture" type="file" accept="image/*" required />
    <Button>Upload Image</Button>
</div>
