import useQuery from "hooks/useQuery"
import { IService } from "types"
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { Input, InputNumber } from "components/FormInputs";
import formErrors from "utils/formErrors";
import { fetchWrapper } from "helpers/fetch-wrapper";
import { useSWRConfig } from "swr";
import { Icon } from '@iconify/react';
import { ChangeEvent, useEffect } from "react";
import { slugify } from "utils/slugify";
import { useRouter } from "next/router";

interface Props {
  slug?: string
}

function Service(props:Props) {
  const router = useRouter()

  const isAddMode = !props?.slug
  const { mutate } = useSWRConfig()
  const {data:service, isLoading, isError} = useQuery<IService>(isAddMode ? undefined : `/api/services/${props?.slug}`)

  /* FORM INIT */
  const { register, formState, handleSubmit, reset, watch, setValue, getValues } = useForm<IService>({ mode: "onBlur" });
  const { errors } = formState

  if(!isAddMode) register("slug", { value: props.slug })
  const _slug = watch('slug', service?.slug || '')

  /* Manually compute slug */
  const regenerateSlug = () => {
    if(!isAddMode) {
      const _title = getValues('title')
      setValue('slug', slugify(_title), { shouldValidate: true, shouldTouch: true, shouldDirty: true })
    }
  }

  /* ACTIONS */
  const onSubmit: SubmitHandler<IService> = data => isAddMode ? createService(data) : updateService(props.slug as string, data)
  
  const createService = (data:IService) => {
    const withSlug = {...data, slug:slugify(data.title)}
    return fetchWrapper.post(`/api/services`, withSlug)
      .then((data) => {
        mutate('/api/services', (current:Array<IService>) => ([...current, data]), false)
        router.push(`/services/edit/${data.slug}`)
      })
      .catch()
  }
  
  const updateService = (slug:string, data:IService) => 
    fetchWrapper.put(`/api/services/${slug}`, data)
    .then((data) => {
      mutate(`/api/services/${slug}`, data, false)
      //Change path if slug has changed
      if(slug !== data.slug) return router.push(`/services/edit/${data.slug}`) 
      reset()
    })
    .catch()

  const deleteService = () => {
    if(isAddMode) return
    return fetchWrapper.delete(`/api/services/${props?.slug}`)
    .then(() => router.push('/services'))
    .catch()
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <h1>{isAddMode ? 'Add Service' : 'Edit Service'}</h1>
      
      <div>
        <Input
          name="title"
          label="Titre"
          type="text"
          placeholder="Title"
          register={register}
          rules={{ ...formErrors.required}}
          errors={errors.title}
          defaultValue={service?.title}
        />
      </div>

      <div>
        <InputNumber
          name="price"
          label="Prix"
          type="number"
          step="0.01"
          placeholder="Price"
          register={register}
          rules={{...formErrors.required, min: { value:0, message:"Veuillez entrez un prix valide" }}}
          errors={errors.price}
          defaultValue={service?.price}
        />
      </div>

      <input type="hidden" {...register('slug')} defaultValue={service?.slug} />

      {/* Regenerate Slug on edit */}
      {!isAddMode && <div>
        <label className="label">Lien</label>
        <div className="inline-group">
          <p>{`/services/${_slug}`}</p>
          <Icon className="ml-2 cursor-pointer" onClick={regenerateSlug} icon="carbon:reset" />
        </div>
      </div>}

      <div className="inline-group space-x-2">
        <button className="btn btn-green inline-group" disabled={formState.isSubmitting || !formState.isDirty || !Object.keys(formState.touchedFields).length}>
          {formState.isSubmitting && <Icon className="fill-current w-4 h-4 mr-2" icon="eos-icons:loading" />}
          {!formState.isSubmitting && <Icon className="fill-current w-4 h-4 mr-2" icon="carbon:save" />}
          <span>Save</span>
        </button>

        <button type="reset" className="btn btn-orange inline-group" disabled={formState.isSubmitting || !formState.isDirty} onClick={() => reset()}>
          <Icon className="fill-current w-4 h-4 mr-2" icon="carbon:reset" />
          <span>Reset</span>
        </button>

        {!isAddMode && 
          <button type="button" className="btn btn-red inline-group" disabled={formState.isSubmitting} onClick={() => deleteService()}>
            <Icon className="fill-current w-4 h-4 mr-2" icon="carbon:delete" />
            <span>Delete</span>
          </button>
        }

        {formState.isSubmitSuccessful && !formState.isDirty &&
          <span className="inline-group text-green-500 text-xl space-x-1">
            <Icon icon="carbon:checkmark" />
            <p>Sauvegardé</p>
          </span>
        }
      </div>
    </form>
  )
}

export {Service}