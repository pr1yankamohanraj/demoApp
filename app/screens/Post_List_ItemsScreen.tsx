import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Post = {
  id: number | string
  type?: string
  title: string
  group: { name: string }
  verified?: boolean
  created_at: string
  description: string
  resource?: { name: string }
  voiceNoteUrl?: string
  commentsCount?: number
  region?: string
};

type Props = {
  post: Post;
  count: number;
  onVote: (delta: number) => void;
};

export default function PostListItem({ post, count, onVote }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.description}>{post.description}</Text>
      <View style={styles.voteRow}>
        <TouchableOpacity onPress={() => onVote(1)} style={styles.voteButton}>
          <FontAwesome name="thumbs-up" size={16} color="#0A4E78" />
        </TouchableOpacity>
        <Text style={styles.voteCount}>{count}</Text>
        <TouchableOpacity onPress={() => onVote(-1)} style={styles.voteButton}>
          <FontAwesome name="thumbs-down" size={16} color="#0A4E78" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#D3EAF4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0A4E78',
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    color: '#1a1a1a',
    marginBottom: 10,
  },
  voteRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteButton: {
    padding: 6,
    marginRight: 10,
  },
  voteCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A4E78',
    marginRight: 10,
  },
});
