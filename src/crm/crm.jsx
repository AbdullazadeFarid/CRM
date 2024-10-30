
import React, { useEffect, useState } from 'react';
import './crm.css';

const CustomerForm = () => {
  const [user, setUser] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    mmc: '',
    phone: '',
    email: '',
    unvan: ''
  });

  const [errors, setErrors] = useState({});

  const getLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
  const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  useEffect(() => {
    const storedCustomers = getLocalStorage('customers');
    setCustomers(storedCustomers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '', // Düzgün sahəni sıfırlayır
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneRegex = /^\+994\d{9}$/;
    const newErrors = {};

    if (!formData.name || !formData.name.trim()) {
        newErrors.name = "Ad və Soyad daxil edin.";
    }

    if (!formData.mmc || !formData.mmc.trim()) {
        newErrors.mmc = "Şirkətin adını daxil edin.";
    }

    if (!formData.phone || !formData.phone.trim() || !phoneRegex.test(formData.phone)) {
        newErrors.phone = "Telefon nömrəsi +994 formatında (məsələn: +994xxxxxxxxx) olmalıdır.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !formData.email.trim() || !emailRegex.test(formData.email)) {
        newErrors.email = "Düzgün bir email daxil edin.";
    }

    if (!formData.unvan || !formData.unvan.trim()) {
        newErrors.unvan = "Ünvanı daxil edin.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newCustomer = { ...formData };

    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);

    setLocalStorage('customers', updatedCustomers);

    setFormData({ name: '', mmc: '', phone: '', email: '', unvan: '' });
  };


  const deleteItems = (indexToDelete) => {
    const updatedCustomers = customers.filter((_, index) => index !== indexToDelete);

    setCustomers(updatedCustomers);

    setLocalStorage('customers', updatedCustomers);
  };



  const addUser = () => {
    setUser(!user);
  };

  return (
    <div className='crm'>
      <div className='crm_user'>
        <h2>İstifadəçi Məlumatları</h2>
        <table>
          <thead>
            <tr>
              <th>İstifadəçi ID</th>
              <th>Ad və Soyad</th>
              <th>İstifadəçi Telefon</th>
              <th>İstifadəçi Email</th>
              <th>Vəzifə</th>
              <th>Şöbə</th>
              <th>Əlavə Tarixi</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Ayxan Əliyev</td>
              <td>+994123456789</td>
              <td>ayxan@example.com</td>
              <td>Satış Meneceri</td>
              <td>Satış</td>
              <td>2023-01-10</td>
              <td>Aktiv</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Məryəm Quliyeva</td>
              <td>+994987654321</td>
              <td>maryam@example.com</td>
              <td>Marketinq Meneceri</td>
              <td>Marketinq</td>
              <td>2022-09-15</td>
              <td>Aktiv</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Orxan Qasımov</td>
              <td>+994192837465</td>
              <td>orxan@example.com</td>
              <td>Müştəri Xidməti</td>
              <td>Müştəri</td>
              <td>2024-05-05</td>
              <td>Deaktiv</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='crm_client'>
        <div className='crm_client_title'>
          <h2>Müştəri məlumatları</h2>
          <button onClick={addUser}> Müştəri əlavə etmək</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Ad və Soyad</th>
              <th>Şirkət Adı</th>
              <th>Müştəri Telefon</th>
              <th>Müştəri Email</th>
              <th>Ünvan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Elvin İsmayılov</td>
              <td>İsmayılov MMC</td>
              <td>+994556677889</td>
              <td>elvin@example.com</td>
              <td>Bakı, Azərbaycan</td>
              <td style={{ cursor: 'pointer', color: 'red' }}>
      sil
    </td>
            </tr>

            {customers.map((customer, index) => (
  <tr key={index}>
    <td>{customer.name}</td>
    <td>{customer.mmc}</td>
    <td>{customer.phone}</td>
    <td>{customer.email}</td>
    <td>{customer.unvan}</td>
    <td onClick={() =>
        deleteItems(index)} style={{ cursor: 'pointer', color: 'red' }}>
      sil
    </td>
  </tr>
))}

          </tbody>
        </table>
      </div>

      <div className='crm_add'>
        {user && (
          <form onClick={addUser} className='crm_add_form' id="customerForm" onSubmit={handleSubmit}>
            <div onClick={(e) => e.stopPropagation()} className='crm_add_form_cont'>
              <input
                type="text"
                name="name"
                placeholder="Ad və Soyad"
                value={formData.name}
                onChange={handleChange}

              />
              {errors.name && <div className="error-message">{errors.name}</div>}

              <input
                type="text"
                name="mmc"
                placeholder="Şirkətin adı"
                value={formData.mmc}
                onChange={handleChange}

              />
              {errors.mmc && <div className="error-message">{errors.mmc}</div>}

              <input
                type="text"
                name="phone"
                placeholder="Telefon"
                value={formData.phone}
                onChange={handleChange}

              />
              {errors.phone && <div className="error-message">{errors.phone}</div>}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}

              />
              {errors.email && <div className="error-message">{errors.email}</div>}

              <input
                type="text"
                name="unvan"
                placeholder="Ünvan"
                value={formData.unvan}
                onChange={handleChange}

              />
              {errors.unvan && <div className="error-message">{errors.unvan}</div>}

              <button type="submit">Əlavə Et</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomerForm;
