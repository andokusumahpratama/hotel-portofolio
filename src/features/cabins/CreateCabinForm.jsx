import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import { createEditCabin } from "../../services/apiCabins";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSesion = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSesion ? editValues : {},
  }); // Jika ada data dari edit maka useForm akan terisi dengan data yang dikirimkan dari cabinToEdit. jika tidak ada maka kosong

  const { errors } = formState;
  // console.log(errors);

  const quertClient = useQueryClient();

  const { isCreating, createCabin } = useCreateCabin(); // * CARA 1
  // * CARA 2
  // const { mutate: createCabin, isLoading: isCreating } = useMutation({
  //   mutationFn: createEditCabin,
  //   onSuccess: () => {
  //     toast.success("New cabin successfully created");
  //     quertClient.invalidateQueries({ queryKey: ["cabin"] });
  //     reset();
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  const { isEditing, editCabin } = useEditCabin(); // * CARA 1
  // * CARA 2
  // const { mutate: editCabin, isLoading: isEditing } = useMutation({
  //   mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
  //   onSuccess: () => {
  //     toast.success("Cabin successfully edited");
  //     quertClient.invalidateQueries({ queryKey: ["cabin"] });
  //     reset();
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    // console.log(data);

    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSesion)
      editCabin(
        { newCabinData: { ...data, image }, id: editId }, // ini akan mengirim variable baru newCabinData dan id ke useEditCabin.js
        {
          onSuccess: (data) => {
            reset(); // ada reset disini karena di useEditCabin.js tidak ada useForm, sebelumnya make cara 2
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset(); // ada reset disini karena di useCreateCabin.js tidak ada useForm, sebelumnya make cara 2
            onCloseModal?.();
          },
        }
      );
    // else createCabin({ ...data, image: image });
  }

  function onError(errors) {
    console.log(errors);
  }

  // console.log(onCloseModal);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              Number(getValues().regularPrice) > Number(value) ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSesion ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSesion ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
