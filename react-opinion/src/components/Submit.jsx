import { useFormState } from "react-dom";
import { useActionState } from "react";

export default function Submit() {
    //the pending property, which is true or false depending on whether the surrounding form is currently being submitted or not.
    const { pending } = useFormState();
    return (<p className="actions">
        <button type="submit" disabled={pending}> {pending ? "Submiting..." : "Submit"}</button>
    </p>);

}