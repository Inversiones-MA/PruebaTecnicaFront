import React, { useState } from "react";
import "./style.css";
import { Button, Card, Col, Form, Input, Modal, Row, Select } from "antd";
import axios from "axios";
import { checkRut, formateaRut } from "../components/Util";
import LogoSeparador from "../images/3_separador-test.png";

const ContenedorFormulario = () => {
  const { Option } = Select;
  const [formAnt] = Form.useForm();
  const [codigoActividad, setCodigoActividad] = useState([]);

  const fetchGetActividades = (rut) => {
    axios
      .get(
        `https://finfastsoapapi.azurewebsites.net/api/test/getactivities?rut=${rut}`,
        {
          headers: {
            PruebaTecnica: "PruebaTecnica",
          },
        }
      )

      .then((response) => {
        setCodigoActividad(response.data.dataList);
        if (!response.data.success) {
          Modal.error({
            title: "Error",
            content: response.data.message,
            onOk: () => resetForm(),
          });
        }
      })
      .catch((error) => {
        resetForm();
      });
  };

  const resetForm = () => {
    formAnt.setFieldsValue({ rut: "", activityCodes: undefined });
    setCodigoActividad([]);
  };

  const fetchGetSecurePrime = (payload) => {
    axios
      .post(
        `https://finfastsoapapi.azurewebsites.net/api/test/getSecurePrime`,
        payload,
        {
          headers: {
            PruebaTecnica: "PruebaTecnica",
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          Modal.success({
            title: response.data.message,
            content: response.data.dataValue["amount"],
            onOk: () => resetForm(),
          });
        }
        if (!response.data.success) {
          Modal.error({
            title: "Error",
            content: response.data.message,
            onOk: () => resetForm(),
          });
        }
      })
      .catch(() => {
        resetForm();
      });
  };

  const onFinish = (value) => {
    fetchGetActividades(formateaRut(value.rut));
    if (Object.keys(codigoActividad).length > 0) {
      fetchGetSecurePrime(value);
    }
  };

  return (
    <Form
      form={formAnt}
      onFinish={onFinish}
      autoComplete="off"
      layout="horizontal"
    >
      <div className="background-image header">
        <Row>
          <Col span={16} offset={4} style={{ marginTop: 100 }}>
            <h1>Protege con seguros 100% online</h1>
            <h2>
              Responsabilidad Civil General para Empresas <br /> Protección
              Financiera para Empleadores
            </h2>
          </Col>
          <Col span={16} offset={4}>
            <Card style={{ marginTop: 100 }}>
              {" "}
              <br />
              <Row>
                <Col xs={12} md={12} lg={6}>
                  <Form.Item
                    label="Rut empresa"
                    name="rut"
                    normalize={(item) => item.replace(/[^0-9kK]/g, "")}
                    rules={[
                      {
                        required: true,
                        validator(_, item) {
                          if (!item) {
                            return Promise.reject(
                              new Error("Ingresa un RUT válido")
                            );
                          }
                          if (!checkRut(item)) {
                            return Promise.reject(new Error("RUT no válido"));
                          }
                          return Promise.resolve(
                            formAnt.setFieldsValue({
                              rut: formateaRut(item),
                            })
                          );
                        },
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col xs={12} md={12} lg={8} offset={2}>
                  <Form.Item
                    label="Actividad a asegurar"
                    name="activityCodes"
                    rules={[
                      {
                        required: Object.keys(codigoActividad).length > 0,
                        message: "Selecciona una actividad",
                        type: "array",
                      },
                    ]}
                  >
                    <Select mode="multiple">
                      {codigoActividad &&
                        codigoActividad.map((item) => (
                          <Option key={item.codigo} value={item.codigo}>
                            {item.actividad}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={12} md={12} lg={6} offset={2}>
                  <Button type="primary" htmlType="submit" block>
                    {Object.keys(codigoActividad).length > 0
                      ? "Cotizar seguro"
                      : "Buscar Actividades por RUT"}
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
      <div style={{ marginTop: 100 }}>
        <Row>
          <Col span={6} offset={4}>
            <h2>Responsabilidad Civil General para Empresas</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              aliquid aspernatur deserunt doloribus ea, eos est et hic iste
              itaque pariatur praesentium quibusdam rem repellat reprehenderit
              rerum sit veritatis voluptate.
            </p>
          </Col>
          <Col span={6} offset={4}>
            <h2>Principales Coberturas</h2>
            <hr />
            <Row>
              <Col lg={12}>Responsabilidad Civil Cruzada</Col>
              <Col lg={12}>
                Responsabilidad Civil por transporte de personas
              </Col>
              <Col lg={12}>Responsabilidad Civil Patronal</Col>
              <Col lg={12}>Defensa penal del Asegurado</Col>
            </Row>
          </Col>
        </Row>
        <img src={LogoSeparador} alt="" />
        <br />
        <br />
        <Row>
          <Col span={6} offset={4}>
            <h2>Responsabilidad Civil General para Empresas</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
              aliquid aspernatur deserunt doloribus ea, eos est et hic iste
              itaque pariatur praesentium quibusdam rem repellat reprehenderit
              rerum sit veritatis voluptate.
            </p>
          </Col>
          <Col span={6} offset={4}>
            <h2>Principales Coberturas</h2>
            <hr />
            <Row>
              <Col lg={12}>Responsabilidad Civil Cruzada</Col>
              <Col lg={12}>
                Responsabilidad Civil por transporte de personas
              </Col>
              <Col lg={12}>Responsabilidad Civil Patronal</Col>
              <Col lg={12}>Defensa penal del Asegurado</Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default ContenedorFormulario;
