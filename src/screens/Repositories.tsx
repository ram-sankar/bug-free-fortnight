import { AxiosError } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import repoServices from "../api/repoServices";

import AuthContext from "../auth/context"
import { colors, sizes } from "../common/theme";

function Repositories() {
  const { user } = useContext(AuthContext);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    getRepos()
  },[]);
  
  const getRepos = async () => {
    try {
      const response: any = await repoServices.getRepos();
      setRepos(response?.data);
    } catch(e) {
      const error = e as AxiosError;
      console.log(error.message);
    }
  }

  const RenderEmptyMessage = () => (
    <View>
      <Text style={styles.emptyMessage}>Your account has no repositories</Text>
    </View>
  )

  const Header = () => (
    <Text style={styles.heading}>Your Repositories</Text>
  )

  const RenderList = ({item}: any) => (
    <View style={styles.repoDetails}>
      <View style={styles.repoHeading}>
        <Text style={styles.repoName}>{item.name}</Text>
        <Text style={styles.repoVisibility}>{item.visibility}</Text>
      </View>
      <Text style={styles.repoDate}>{new Date(item.created_at).toISOString().split('T')[0]}</Text>
      <Text style={styles.repoDescription}>{item.description}</Text>
    </View>
  )

  const RenderRepos = () => (
    <View style={{flex: 1}}>
      <Header />
      <FlatList
        data={repos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={RenderList}
        showsVerticalScrollIndicator={true}
      />
    </View>
  )

  return (
      <View style={styles.container}>
        {repos.length!==0 ? <RenderRepos/> : <RenderEmptyMessage/>}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 60,
    fontWeight: '700',
    fontSize: sizes.fontXL
  },
  heading: {
    textAlign: 'center',
    marginTop: 60,
    fontWeight: '700',
    fontSize: sizes.fontXL,
    color: colors.darkGrey
  },
  repoHeading: {
    flexDirection: 'row',
    width: '100%'
  },
  repoName: {
    flex: 1,
    fontWeight: '700',
    fontSize: sizes.fontL,
    color: colors.primary,
  },
  repoDescription: {
    fontSize: sizes.font,
    color: colors.darkGrey,
  },
  repoDate: {
    fontSize: sizes.fontS,
    color: colors.darkGrey,
  },
  repoDetails: {
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  repoVisibility: {
    fontWeight: '700',
    fontSize: sizes.fontS,
    color: colors.darkGrey,
  }
});
export default Repositories;