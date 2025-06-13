
import { use } from "react";
import { useFormState } from "react-dom"; //his hook actually can't be used in the component that contains the form and the formAction.
//but instead it must be used in some nested component.
import { useActionState } from "react";
import { OpinionsContext } from "../store/opinions-context";
import Submit from "./Submit";
export function NewOpinion() {

 const {addOpinion}= use(OpinionsContext) // use method use to access some context

  async function shareOpinionAction(prevState, formData) {

    const title = formData.get('title');
    const body = formData.get('body');
    const userName = formData.get('userName');

    let errors = [];

    if (title.trim().length < 5) {
      errors.push('title must be at least 5 char long');
    }

    if (body.trim().length < 10 || body.trim().length > 300) {
      errors.push('opinion must be b/w 10 to 300 long')
    }

    if (!userName.trim()) {
      errors.push('please provide user name');
    }

    if (errors.length > 0) {
      return {
        errors, enteredValues: {
          title, body, userName
        }
      };
    }
    //submit to backedn 
    await addOpinion({title, body, userName, });
    return { errors: null }
  }

  //pending is true untill return promise is resolve in  await addOpinion({title, body, userName, });
  const [formState, formAction] = useActionState(shareOpinionAction, { errors: null });
  //const [formState, formAction, pending] = useActionState(shareOpinionAction, { errors: null });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName"  defaultValue={formState.enteredValues?.userName}/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title"  defaultValue={formState.enteredValues?.title}/>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5}  defaultValue={formState.enteredValues?.body}></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        {/* <p className="actions">
          <button type="submit">Submit</button>
        </p> */}
        <Submit/>
      </form>
    </div>
  );
}
