import * as React from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import { SelectOption } from './MessagingTypes';
import { connect } from "react-redux";
import * as Types from '../../constants/Types';

const customStyles = {
  indicatorsContainer: (provided: React.CSSProperties): React.CSSProperties => ({
    ...provided,
    backgroundColor: '#D8ECFF'
  }),
  valueContainer: (provided: React.CSSProperties): React.CSSProperties => ({
    ...provided,
    backgroundColor: '#D8ECFF'
  })
}

interface RecipentAddressProps {
  selectedOption: SelectOption;
  setOption: (newOption: SelectOption) => void;
  teachers: Array<Types.Teacher>;
}

const RecipentAddress: React.FC<RecipentAddressProps> = (props: RecipentAddressProps) => {
  const teacherList: Array<{value: string, id: string, label: string}> = [];
  useEffect(() => {
    // converts teacher list into proper format for Select component
    props.teachers.forEach((teacher) => {
      const newTeacher = {
        value: teacher.email,
        id: teacher.id,
        label: (teacher.firstName + ' ' + teacher.lastName)
      };
      teacherList.push(newTeacher);
    });
  })

  return (
    <Select
      value={props.selectedOption}
      onChange={props.setOption}
      options={teacherList}
      styles={customStyles}
    />
  );
}

const mapStateToProps = (state: Types.ReduxState): {
  teachers: Array<Types.Teacher>
} => {
  return {
    teachers: state.teacherListState.teachers
  };
};

export default connect(mapStateToProps, null)(RecipentAddress);
