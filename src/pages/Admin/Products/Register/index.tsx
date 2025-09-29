import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useToastLoading from '../../../../hooks/useToastLoading';
import { ProductForm } from '../../../../types/product';
import { InputFile, InputText } from '../../../../components/Input';
import {
  getProductById,
  postProductRequest,
  putProductRequest,
} from '../../../../services/productRequest';
import Box, { BoxContainer } from '../../../../components/Box';

export default function RegisterProducts() {
  const navigate = useNavigate();
  const { idProduct } = useParams<string>();
  const toastLoading = useToastLoading();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductForm>();

  const fetchProduct = async () => {
    if (idProduct) {
      const response = await getProductById(idProduct);
      if (response.success) {
        reset({
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          image: undefined,
        });
        setPreviewImage(response.data.imageUrl);
      } else {
        toastLoading({ mensagem: 'Produto não encontrado', tipo: 'error' });
      }
    }
  };
  
  const onSubmit = async (data: ProductForm) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', String(data.price));

    if (data.image && data.image.length > 0)
      formData.append('image', data.image[0]);

    const request = idProduct
      ? () => putProductRequest(idProduct, formData)
      : () => postProductRequest(formData);

    const response = await request();

    if (response.success) {
      toastLoading({
        tipo: 'success',
        mensagem: idProduct
          ? 'Produto atualizado com sucesso!'
          : 'Produto cadastrado com sucesso!',
      });
      navigate(`/listing/product`);
    } else {
      toastLoading({ mensagem: response.data, tipo: 'error' });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <BoxContainer>
      <Box>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-8 mt-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputText
              name="name"
              label="Nome do Produto"
              type="text"
              disabled={isSubmitting}
              register={register}
              errors={errors}
              required
              validation={{ required: 'Nome é obrigatório' }}
            />

            <InputText
              name="price"
              label="Preço"
              type="number"
              disabled={isSubmitting}
              register={register}
              errors={errors}
              required
              validation={{
                required: 'Preço é obrigatório',
                min: { value: 1, message: 'Preço deve ser maior que 0' },
              }}
            />
          </div>

          <InputText
            name="description"
            label="Descrição"
            type="text"
            disabled={isSubmitting}
            register={register}
            errors={errors}
            required
            validation={{ required: 'Descrição é obrigatória' }}
          />

          {previewImage && (
            <div>
              <p className="text-sm text-gray-500 mb-2">Imagem atual:</p>
              <img
                src={previewImage}
                alt="Imagem do produto"
                className="w-40 h-40 object-cover rounded-lg border shadow-sm"
              />
            </div>
          )}

          <InputFile
            name="image"
            label="Nova Imagem (opcional)"
            control={control}
            errors={errors}
            maxSizeMB={2}
          />

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/listing/product')}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Salvando...'
                : idProduct
                  ? 'Atualizar Produto'
                  : 'Cadastrar Produto'}
            </button>
          </div>
        </form>
      </Box>
    </BoxContainer>
  );
}
