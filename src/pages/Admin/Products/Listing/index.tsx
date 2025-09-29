import { useState, useEffect } from 'react';
import { ProductFilter, ProductList } from '../../../../types/product';
import useToastLoading from '../../../../hooks/useToastLoading';
import { useForm } from 'react-hook-form';
import useDebounce from '../../../../hooks/useDebounce';
import Page from '../../../../components/Page';
import Box, { BoxContainer } from '../../../../components/Box';
import EmptyPage from '../../../../components/EmptyPage';
import Tabela from '../../../../components/Tabela';
import PageTable from '../../../../components/PageTable';
import {
  deleteProduct,
  getListProduct,
} from '../../../../services/productRequest';
import {
  FaPlus,
  FaSortUp,
  FaSortDown,
  FaSort,
  FaSearch,
  FaEdit,
  FaTrash,
} from 'react-icons/fa';
import Button from '../../../../components/Button';
import { InputText } from '../../../../components/Input';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../../components/Modal';

export default function ListingProducts() {
  const [listProduct, setListProduct] = useState<Array<ProductList>>([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalRegister, setTotalRegister] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const toast = useToastLoading();
  const registerForPage = 10;
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [productSelect, setProductSelect] = useState<ProductList | null>(null);
  const [confirmToDelete, setConfirmToDelete] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFilter>();

  const watchUseEffect = watch();

  const handleNewProduct = () => {
    navigate(`/admin/register/product`);
  };

  const carriesProduct = async (
    pageSize: number = registerForPage,
    page: number = 0
  ) => {
    let filtros: ProductFilter = { page: page + 1, limit: pageSize };

    await handleSubmit((dataForm) => {
      filtros = {
        ...filtros,
        name: dataForm.name ?? '',
        description: dataForm.description ?? '',
        price: dataForm.price ?? 0,
      };
    })();

    setLoading(true);
    let url = `?page=${filtros.page}&limit=${filtros.limit}`;
    if (filtros.name) url += `&name=${encodeURIComponent(filtros.name)}`;
    if (filtros.description)
      url += `&description=${encodeURIComponent(filtros.description)}`;
    if (filtros.price) url += `&price=${encodeURIComponent(filtros.price)}`;

    const response = await getListProduct(url);

    if (response.success) {
      setCurrentPage(response.data.page - 1);
      setTotalRegister(response.data.total);
      setTotalPage(Math.ceil(response.data.total / response.data.limit));

      const products = response.data.products;

      // Ordenação manual
      if (sortField) {
        products.sort((a, b) => {
          const valA = a[sortField as keyof ProductList];
          const valB = b[sortField as keyof ProductList];

          if (typeof valA === 'number' && typeof valB === 'number') {
            return sortOrder === 'asc' ? valA - valB : valB - valA;
          }

          const strA = String(valA).toLowerCase();
          const strB = String(valB).toLowerCase();
          if (strA < strB) return sortOrder === 'asc' ? -1 : 1;
          if (strA > strB) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }

      setListProduct(products);
    } else {
      toast({ tipo: 'error', mensagem: response.data });
    }

    setLoading(false);
  };

  const handleSort = (field: string) => {
    if (sortField === field) setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    else {
      setSortField(field);
      setSortOrder('asc');
    }
    carriesProduct(registerForPage, currentPage);
  };

  const handleEditProduct = (id: string) => {
    navigate(`/admin/register/product/${id}`);
  };

  function handleDeletProduct(dados: ProductList): void {
    setProductSelect({ ...dados });
    setConfirmToDelete(true);
  }

  async function confirmDeleteProduct() {
    if (productSelect == null) return;
    toast({ mensagem: 'Deletando Professor' });
    const response = await deleteProduct(productSelect.id);

    if (response.success) {
      carriesProduct();
      setProductSelect(null);
      toast({
        mensagem: 'Deletado com sucesso.',
        tipo: 'success',
      });
    } else {
      toast({
        mensagem: response.data,
        tipo: 'error',
      });
    }
  }

  const filtroDebounce = useDebounce(carriesProduct, 1000);

  const getSortIcon = (field: string) => {
    if (sortField !== field) return <FaSort className="text-gray-400 ml-1" />;
    return sortOrder === 'asc' ? (
      <FaSortUp className="text-primary ml-1" />
    ) : (
      <FaSortDown className="text-primary ml-1" />
    );
  };

  function handleClearFilters() {
    reset({ name: '', description: '', price: 0 });
    carriesProduct(registerForPage, 0);
  }

  useEffect(() => {
    const subscription = watch(() => filtroDebounce());
    return () => subscription.unsubscribe();
  }, [watchUseEffect]);

  useEffect(() => {
    filtroDebounce();
  }, []);

  return (
    <Page loading={loading}>
      <BoxContainer>
        {/* Filter Section */}
        <Box>
          <div className="flex justify-between">
            <div className="flex items-center gap-2 mb-2">
              <FaSearch className="text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-700">Filtros</h2>
            </div>
            <div className="flex justify-end mt-2">
              <Button
                text="Limpar filtros"
                type="aviso"
                onClick={handleClearFilters}
              />
            </div>
          </div>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <InputText
              name="name"
              label="Nome do Produto"
              type="text"
              register={register}
              errors={errors}
              placeholder="Buscar por nome..."
            />
            <InputText
              name="description"
              label="Descrição"
              type="text"
              register={register}
              errors={errors}
              placeholder="Buscar por descrição..."
            />
            <InputText
              name="price"
              label="Preço"
              type="number"
              register={register}
              errors={errors}
              placeholder="Filtrar por preço..."
              step="0.01"
            />
          </form>
        </Box>

        {!listProduct.length ? (
          <Box>
            <EmptyPage
              texto="Nenhum produto encontrado adicione um novo produto ou mude os filtros"
              botao={true}
              acao={handleNewProduct}
            />
          </Box>
        ) : (
          <Box>
            <Tabela
              titulo="Produtos"
              botoes={
                <Button
                  text="Adicionar"
                  type="informacao"
                  onClick={handleNewProduct}
                  icon={<FaPlus />}
                />
              }
            >
              <Tabela.Header>
                <Tabela.Header.Coluna>#</Tabela.Header.Coluna>
                <Tabela.Header.Coluna>
                  <div
                    className="flex items-center gap-1 cursor-pointer select-none"
                    onClick={() => handleSort('name')}
                  >
                    Nome {getSortIcon('name')}
                  </div>
                </Tabela.Header.Coluna>
                <Tabela.Header.Coluna>
                  <div
                    className="flex items-center gap-1 cursor-pointer select-none"
                    onClick={() => handleSort('description')}
                  >
                    Descrição {getSortIcon('description')}
                  </div>
                </Tabela.Header.Coluna>
                <Tabela.Header.Coluna>
                  <div
                    className="flex items-center gap-1 cursor-pointer select-none"
                    onClick={() => handleSort('price')}
                  >
                    Preço {getSortIcon('price')}
                  </div>
                </Tabela.Header.Coluna>
                <Tabela.Header.Coluna alignText="text-center">
                  Ações
                </Tabela.Header.Coluna>
              </Tabela.Header>

              <Tabela.Body>
                {listProduct.map((item) => (
                  <Tabela.Body.Linha key={item.id}>
                    <Tabela.Body.Linha.Coluna>
                      {item.id}
                    </Tabela.Body.Linha.Coluna>
                    <Tabela.Body.Linha.Coluna>
                      {item.name}
                    </Tabela.Body.Linha.Coluna>
                    <Tabela.Body.Linha.Coluna>
                      {item.description}
                    </Tabela.Body.Linha.Coluna>
                    <Tabela.Body.Linha.Coluna>
                      <span
                        className={`${item.price > 0 ? 'text-green-600 font-semibold' : 'text-gray-400'}`}
                      >
                        {item.price > 0
                          ? `R$ ${item.price.toFixed(2)}`
                          : 'R$ 0,00'}
                      </span>
                    </Tabela.Body.Linha.Coluna>

                    <Tabela.Body.Linha.Coluna alignText="text-center">
                      <div className="flex gap-2 justify-center">
                        {/* Ícone Editar */}
                        <button
                          onClick={() => {
                            handleEditProduct(item.id);
                          }}
                          className="text-blue-500 hover:text-blue-700"
                          title="Editar"
                        >
                          <FaEdit />
                        </button>

                        {/* Ícone Remover */}
                        <button
                          onClick={() => {
                            handleDeletProduct(item);
                          }}
                          className="text-red-500 hover:text-red-700"
                          title="Remover"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </Tabela.Body.Linha.Coluna>
                  </Tabela.Body.Linha>
                ))}
              </Tabela.Body>
            </Tabela>

            <PageTable
              loading={loading}
              page={currentPage}
              totalRegister={totalRegister}
              registerForPage={registerForPage}
              totalPage={totalPage}
              onClickPaginaPrev={() => {
                const newPage = currentPage - 1;
                setCurrentPage(newPage);
                carriesProduct(registerForPage, newPage);
              }}
              onClickPageNext={() => {
                const newPage = currentPage + 1;
                setCurrentPage(newPage);
                carriesProduct(registerForPage, newPage);
              }}
              onClickPage={(pagina) => {
                setCurrentPage(pagina);
                carriesProduct(registerForPage, pagina);
              }}
            />
          </Box>
        )}
      </BoxContainer>

      <Modal open={confirmToDelete} setOpen={setConfirmToDelete}>
        <Modal.Titulo texto={`Deletar ${productSelect?.name}`} />
        <Modal.Descricao
          texto={`Deseja realmente deletar ${productSelect?.name}?`}
        />

        <Modal.ContainerBotoes>
          <Modal.BotaoAcao textoBotao="Deletar" acao={confirmDeleteProduct} />
          <Modal.BotaoCancelar />
        </Modal.ContainerBotoes>
      </Modal>
    </Page>
  );
}
