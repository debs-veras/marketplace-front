import { InputHTMLAttributes, useState } from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { removeMask } from '../../utils/formatar';
import { BiHide, BiShow } from 'react-icons/bi';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  control?: Control<any>;
  register?: UseFormRegister<any>;
  name: string;
  value?: string | number | boolean | null;
  disabled?: boolean;
  label: string;
  icon?: React.ReactNode;
  errors?: FieldErrors<any>;
  required?: boolean;
  type?: string;
  placeholder?: string;
  validation?: Parameters<UseFormRegister<any>>[1];
  validateStrength?: boolean;
  watch?: UseFormWatch<any>;
  step?: number;
};

export function InputCpf({
  control,
  name,
  label,
  icon,
  errors,
  placeholder,
  required = true,
  disabled = false,
}: InputProps) {
  const errorForField = errors?.[name] as FieldError | undefined;

  // Validação do CPF
  const validateCPF = (cpf?: string) => {
    const cleaned = removeMask(cpf || '');
    if (required && !cleaned) return 'CPF é obrigatório';
    if (cleaned && cleaned.length !== 11) return 'CPF deve ter 11 dígitos';
    if (cleaned && /^(\d)\1+$/.test(cleaned)) return 'CPF inválido';
    return true;
  };
  // Formata CPF enquanto digita
  const formatCPF = (value: string = '') => {
    const numbers = removeMask(value);
    if (!numbers) return '';
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6)
      return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9)
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;

    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ validate: validateCPF }}
        render={({ field }) => (
          <div className="relative group">
            {icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
              </div>
            )}
            <input
              {...field}
              value={formatCPF(field.value || '')}
              onChange={(e) => field.onChange(formatCPF(e.target.value))}
              placeholder={placeholder}
              disabled={disabled}
              type="text"
              className={`w-full ${icon ? 'pl-10' : 'pl-4'}  pr-4 py-2 sm:py-3 text-base border-2 rounded-xl outline-none bg-gray-50/50 group-hover:bg-white transition-all duration-300 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100`}
            />
          </div>
        )}
      />
      {errorForField && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
          {errorForField.message}
        </p>
      )}
    </div>
  );
}

export function InputText(props: InputProps) {
  const { register, validation } = props;
  const { ...propsInput }: InputProps = props;
  const errorForField = propsInput.errors?.[propsInput.name] as
    | FieldError
    | undefined;
  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-gray-700">
        {propsInput.label}
        {propsInput.required ? <span className="text-red-500">*</span> : null}
      </label>
      <div className="relative group">
        {propsInput.icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {propsInput.icon}
          </div>
        )}
        <input
          id={propsInput.name}
          disabled={propsInput.disabled}
          name={propsInput.name}
          type={propsInput.type}
          step={props.step}
          placeholder={propsInput.placeholder}
          {...(register && register(propsInput.name, validation))}
          value={
            propsInput.value && propsInput.value !== true
              ? propsInput.value
              : undefined
          }
          className={`w-full ${propsInput.icon ? 'pl-10' : 'pl-4'} pr-4 py-3 sm:py-3 text-base border-2 rounded-xl outline-none bg-gray-50/50 group-hover:bg-white transition-all duration-300 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100`}
        />
      </div>
      {errorForField && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
          {errorForField.message}
        </p>
      )}
    </div>
  );
}

export function InputPhone({
  control,
  name,
  label,
  icon,
  errors,
  placeholder,
  required = true,
  disabled = false,
}: InputProps) {
  const errorForField = errors?.[name] as FieldError | undefined;
  // Validação do celular
  const validatePhone = (value?: string) => {
    const cleaned = removeMask(value || '');
    if (required && !cleaned) return 'Celular é obrigatório';
    if (cleaned && (cleaned.length < 10 || cleaned.length > 11))
      return 'Telefone deve ter 10 ou 11 dígitos';
    return true;
  };
  // Formata celular enquanto digita
  const formatPhone = (value: string = '') => {
    const numbers = removeMask(value);
    if (!numbers) return '';
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 6)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;

    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{ validate: validatePhone }}
        render={({ field }) => (
          <div className="relative group">
            {icon && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
              </div>
            )}
            <input
              {...field}
              disabled={disabled}
              value={formatPhone(field.value || '')}
              onChange={(e) => field.onChange(formatPhone(e.target.value))}
              placeholder={placeholder}
              type="text"
              className={`w-full ${icon ? 'pl-10' : 'pl-4'}  pr-4 py-3 sm:py-3 text-base border-2 rounded-xl outline-none bg-gray-50/50 group-hover:bg-white transition-all duration-300 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100`}
            />
          </div>
        )}
      />
      {errorForField && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
          {errorForField.message}
        </p>
      )}
    </div>
  );
}

export function InputPassword({
  name,
  label,
  icon,
  register,
  errors,
  watch,
  validation,
  placeholder,
  validateStrength = false,
  required = true,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const errorForField = errors?.[name] as FieldError | undefined;
  const toggleVisibility = () => setShowPassword((prev) => !prev);

  // Valor atual da senha
  const passwordValue = (watch && watch(name)) || '';

  // Requisitos da senha
  const requirements = [
    { label: 'Mínimo de 6 caracteres', test: (v: string) => v.length >= 6 },
    {
      label: 'Pelo menos uma letra maiúscula',
      test: (v: string) => /[A-Z]/.test(v),
    },
    { label: 'Pelo menos um número', test: (v: string) => /[0-9]/.test(v) },
    {
      label: 'Pelo menos um caractere especial',
      test: (v: string) => /[^A-Za-z0-9]/.test(v),
    },
  ];

  // Validação integrada ao RHF
  const validatePassword = (v: string) => {
    if (validateStrength) {
      for (const req of requirements) {
        if (!req.test(v))
          return `Senha inválida: falta ${req.label.toLowerCase()}`;
      }
    }
    return true;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          {...(register &&
            register(name, {
              ...validation,
              validate: validatePassword,
            }))}
          className={`w-full ${icon ? 'pl-10' : 'pl-4'}  pr-10 py-3 text-base border-2 rounded-xl outline-none bg-gray-50/50 group-hover:bg-white transition-all duration-300 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100`}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:bg-gray-100 rounded-lg"
        >
          {showPassword ? (
            <BiHide className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <BiShow className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </button>
      </div>

      {/* Feedback de erro */}
      {errorForField && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-2"></span>
          {errorForField.message}
        </p>
      )}

      {/* Checklist em tempo real */}
      {validateStrength && passwordValue && (
        <ul className="mt-2 space-y-1 text-sm">
          {requirements.map((req, idx) => {
            const ok = req.test(passwordValue);
            return (
              <li
                key={idx}
                className={`flex items-center ${ok ? 'text-green-600' : 'text-gray-500'}`}
              >
                <span
                  className={`w-2 h-2 rounded-full mr-2 ${
                    ok ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
                {req.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

import { BiImageAdd } from 'react-icons/bi';

type InputFileProps = {
  name: string;
  label: string;
  control: Control<any>;
  errors?: FieldErrors<any>;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
  maxSizeMB?: number;
  onFileChange?: (file: File | null) => void;
};

export function InputFile({
  name,
  label,
  control,
  errors,
  required = true,
  disabled = false,
  accept = 'image/*',
  maxSizeMB = 10,
  onFileChange,
}: InputFileProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const errorForField = errors?.[name] as FieldError | undefined;

  const validateFile = (fileList?: FileList) => {
    if (!fileList || fileList.length === 0)
      return required ? 'Imagem é obrigatória' : true;

    const file = fileList[0];
    if (!file.type.startsWith('image/'))
      return 'Arquivo precisa ser uma imagem';

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes)
      return `Imagem deve ter no máximo ${maxSizeMB}MB`;

    return true;
  };

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } else setPreview(null);

    if (onFileChange) onFileChange(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    if (onFileChange) onFileChange(null);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-900">
        {label} {required ? <span className="text-red-500">*</span> : null}
      </label>

      <Controller
        name={name}
        control={control}
        rules={{ validate: validateFile }}
        render={({ field }) => (
          <div className="space-y-3">
            {/* Área de Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors bg-white">
              {preview ? (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="mx-auto h-32 w-32 object-cover rounded-lg shadow-sm"
                  />
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">
                      {selectedFile?.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedFile &&
                        (selectedFile.size / (1024 * 1024)).toFixed(2)}{' '}
                      MB
                    </p>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="text-sm text-red-600 hover:text-red-800 mt-2 transition-colors"
                    >
                      Remover imagem
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <BiImageAdd className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <label className="cursor-pointer">
                      <span className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Selecionar arquivo
                      </span>
                      <input
                        id={name}
                        type="file"
                        accept={accept}
                        disabled={disabled}
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          handleFileSelect(file);
                          field.onChange(e.target.files);
                        }}
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      ou arraste e solte
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG, GIF até {maxSizeMB}MB
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      />

      {errorForField && (
        <p className="text-red-600 text-sm mt-1 flex items-center">
          <span className="w-1.5 h-1.5 bg-red-600 rounded-full mr-2"></span>
          {errorForField.message}
        </p>
      )}
    </div>
  );
}
