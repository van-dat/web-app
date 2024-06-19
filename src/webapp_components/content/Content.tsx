import styled from "styled-components";
import user from "../../assets/img/user1.svg";
import "./Content.scss";
import { useCallback, useEffect, useState } from "react";
import { getListCategory, getListTutor } from "../../services/webApp.service";


const Content = () => {
  const [choseOption, setChoseOption] = useState<number>(2);
  const [tutorList, setTutorList] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const fetchDataCategory = async () => {
    const dataCategory = await getListCategory();
    if (dataCategory?.status === 200) {
      setListCategory(dataCategory.data?.data);
    }
  };

  const fetchDataTutor = async (categoryId?: number) => {
    const dataTutor = await getListTutor(categoryId || choseOption);

    if (dataTutor?.status === 200) {
      setTutorList(dataTutor.data?.data);
    }
  };

  useEffect(() => {
    fetchDataCategory();
    fetchDataTutor();
  }, []);

  const handleClickAssistant = (item: any, e) => {
    const jsonData = JSON.stringify(item);
    localStorage.setItem("data", jsonData);
    const name = item?.assistantName.toLowerCase().replace(" ", "-");
    e.preventDefault();
    window.history.pushState({}, "","/auth?name=" + name);
    window.location.reload();
  };

  const handleChangeCategory = useCallback((categoryId: number) => {
    setChoseOption(categoryId);
    fetchDataTutor(categoryId);
  }, []);

  return (
    <>
      <LayoutContent id="content">
        <LayoutOption className="layoutOption">
          <div className="boxImage">
            <img src={user} alt="image-user" />
          </div>
          <OptionList className="optionList">
            <OptionTitle>Tutors</OptionTitle>
            {listCategory.map((category: any) => (
              <OptionItem
                className="optionItem"
                value={category.categoryId}
                option={choseOption}
                key={category.categoryId}
                onClick={() => handleChangeCategory(category.categoryId)}
              >
                {category.name}
              </OptionItem>
            ))}
          </OptionList>
        </LayoutOption>
        <LayoutAssistant>
          <BackgroundAssistant></BackgroundAssistant>
          <ListAssistant className="listAssistant">
            {tutorList.map((item: any, index: number) => (
              <ItemAssistant
                href={`/auth?name=${item?.assistantName
                  .toLowerCase()
                  .replace(" ", "-")}`}
                key={index}
                onClick={(e) => handleClickAssistant(item, e)}
                className="itemAssistant"
              >
                <FormUser>
                  <div className="box-image">
                    <img src={item.avatarUrl} alt="assistant" />
                  </div>
                  <FormFlag className="box-flag">
                    <img src={item.flagUrl} alt="flag" />
                  </FormFlag>
                </FormUser>
                <AssistantName>{item.assistantName}</AssistantName>
                <AssistantType>Tutors</AssistantType>
                <AssistantLevel>{item.position}</AssistantLevel>
              </ItemAssistant>
            ))}
          </ListAssistant>
        </LayoutAssistant>
      </LayoutContent>
    </>
  );
};

export default Content;

const LayoutContent = styled.div`
  padding-top: 6rem;
  display: flex;
  color: white;

  flex-direction: column;
  gap: 4rem;
`;

const LayoutOption = styled.div`
  display: flex;
  align-items: end;
  gap: 42px;
  justify-content: center;
  align-items: end;
`;
const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const OptionTitle = styled.h1`
  font-size: 23px;
  font-weight: 700;
  line-height: 28.75px;
  color: rgba(201, 201, 201, 1);
  padding-bottom: 16px;
  font-family: Quicksand;
`;
const OptionItem: any = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  height: 38px;
  padding-left: 10px;
  border-radius: 7px;
  background: ${(props: any) =>
    props.value == props.option
      ? "linear-gradient(179.99deg, #41c8ed 5.11%, #00648a 84.34%);"
      : "rgba(84, 98, 111, 1);"};
  font-family: Poppins;
  font-size: 20px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;
  color: rgba(227, 227, 227, 1);
  cursor: pointer;
`;
const LayoutAssistant = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundAssistant = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    0deg,
    rgba(45, 45, 45, 0) 0%,
    rgba(88, 133, 174, 0.2162) 27.26%,
    rgba(15, 189, 200, 0.46) 48.1%,
    rgba(147, 147, 147, 0) 100%
  );
`;
const ListAssistant = styled.div`
  display: grid;
`;
const ItemAssistant = styled.a`
  color: white;
  text-decoration: none;
  max-width: 191px;
  max-height: 250px;
  padding: 12px 16px 0px 16px;
  gap: 5px;
  border-radius: 25px;
  border: 1px solid #fff;
  background: linear-gradient(179.99deg, #41c8ed 5.11%, #00648a 84.34%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
  cursor: pointer;
  &:hover {
    color: white;
  }
`;
const FormUser = styled.div`
  position: relative;
`;
const FormFlag = styled.div`
  position: absolute;
  left: 30%;
  bottom: -6px;
`;

const AssistantName = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  text-align: center;
  margin: 0;
`;
const AssistantType = styled.div`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 600;
  line-height: 18px;
  text-align: center;
  padding: 0px 8px 0px 8px;
  border-radius: 14px;
  opacity: 0px;
  background: rgba(54, 195, 232, 1);
  line-height: 18px;
`;

const AssistantLevel = styled.p`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  text-align: center;
`;
